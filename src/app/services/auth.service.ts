import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData, RawUser } from '../user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUpUrl = '/users';
  private loginUrl = '/users/login';
  public user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  signup(newUser: RawUser): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.signUpUrl, newUser).pipe(
      tap((resData) => {
        this.handleAuthentication(resData);
      })
    );
  }

  login(user: RawUser): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.loginUrl, user);
  }

  private handleAuthentication(resData: AuthResponseData): void {
    const resUserData = resData.user;
    const user = new User(
      resUserData.name,
      resUserData.email,
      resUserData.id,
      resData.token
    );
    this.user.next(user);
  }
}
