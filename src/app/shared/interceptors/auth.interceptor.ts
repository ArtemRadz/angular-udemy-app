import {
  HttpHandlerFn,
  HttpParams,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { EMPTY, Observable, catchError, of, switchMap, throwError } from 'rxjs';

import { AuthQuery } from 'src/app/features/auth/state/auth.query';
import { AuthService } from 'src/app/features/auth/state/auth.service';
import { environment } from 'src/environments/environment';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> {
  const authService = inject(AuthService);
  const authQuery = inject(AuthQuery);
  const isAuthenticated = authQuery.isAuthenticated();
  const accessToken = authQuery.accessToken() as string;
  const router = inject(Router);

  if (!environment.allowedOrigins.find(o => req.url.includes(o))) {
    return next(req);
  }

  if (!isAuthenticated) {
    return next(req);
  }

  return next(attachAuthToken(accessToken, req)).pipe(
    catchError(e => {
      if (e.status === HttpStatusCode.Unauthorized) {
        return handleTokenExpired(req, next, authService, authQuery, router);
      }

      return throwError(() => e);
    })
  );
}

function attachAuthToken(token: string, req: HttpRequest<unknown>) {
  return req.clone({ params: new HttpParams().set('auth', token) });
}

function handleTokenExpired(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  authQuery: AuthQuery,
  router: Router
): Observable<any> {
  return authService.refreshToken().pipe(
    switchMap(() => {
      return next(attachAuthToken(authQuery.accessToken() as string, request));
    }),
    catchError(() => {
      authService.reset();
      router.navigateByUrl('/recipe-app/auth/login');
      return of(EMPTY);
    })
  );
}
