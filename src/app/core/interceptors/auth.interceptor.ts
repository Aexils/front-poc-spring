import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const auth0 = inject(AuthService);
    return from(auth0.getAccessTokenSilently()).pipe(
      switchMap(token => {
        const clone = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(clone);
      })
    );
  }
}
