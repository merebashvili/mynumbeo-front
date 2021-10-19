import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData, RawUser } from '../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUpUrl = '/users';
  constructor(private http: HttpClient) {}

  signup(newUser: RawUser): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.signUpUrl, newUser);
  }
}