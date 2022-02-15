import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData, RawUser } from '../user';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUpUrl = '/users';
  private loginUrl = '/users/login';
  private logoutUrl = '/users/logout';
  public user = new BehaviorSubject<User | null>(null);
  public isAuthenticated$ = this.user.pipe(map((user) => !!user));

  constructor(private http: HttpClient, private router: Router) {}

  signup(newUser: RawUser): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.signUpUrl, newUser).pipe(
      tap((resData) => {
        this.handleAuthentication(resData);
      })
    );
  }

  login(user: RawUser): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.loginUrl, user).pipe(
      tap((resData) => {
        this.handleAuthentication(resData);
      })
    );
  }

  logout(): Observable<User> {
    return this.user.pipe(
      take(1),
      switchMap((user) => {
        return this.http.post<User>(this.logoutUrl, user).pipe(
          tap(() => {
            this.user.next(null);
            localStorage.removeItem('userData');
          })
        );
      })
    );
  }

  autoLogin() {
    const unparsedUserData = localStorage.getItem('userData');
    const parsedUserData = unparsedUserData
      ? JSON.parse(unparsedUserData)
      : null;
    if (!parsedUserData) {
      return;
    }

    const newUser = new User(
      parsedUserData.name,
      parsedUserData.email,
      parsedUserData._id,
      parsedUserData._token
    );

    if (newUser.token) {
      this.user.next(newUser);
    }
  }

  private handleAuthentication(resData: AuthResponseData): void {
    const resUserData = resData.user;
    const user = new User(
      resUserData.name,
      resUserData.email,
      resUserData._id,
      resData.token
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.router.navigate(['/countries-list']);
  }
}
