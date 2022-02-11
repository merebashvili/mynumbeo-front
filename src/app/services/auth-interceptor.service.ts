import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      // take(1) will automatically unsubscribe after taking one value
      take(1),
      /* if we used map here instead of switchMap or other flattening operators, we would get an Observable
      of Observables (higher-order Observable), so in order to work with these, I use one of the flattening
      operators - switchMap which converts this higher-order Observable into an ordinary Observable.
      */
      switchMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          headers: new HttpHeaders({
            Authorization: `Bearer ${user?.token}`,
          }),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
