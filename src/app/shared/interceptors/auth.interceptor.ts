import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpParams,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { EMPTY, Observable, catchError, of, throwError } from 'rxjs';

import { AuthQuery } from 'src/app/features/auth/state/auth.query';
import { AuthService } from 'src/app/features/auth/state/auth.service';
import { environment } from 'src/environments/environment';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> {
  const authQuery = inject(AuthQuery);
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authQuery.isAuthenticated();
  const accessToken = authQuery.accessToken() as string;

  if (!environment.allowedOrigins.find(o => req.url.includes(o))) {
    return next(req);
  }

  if (!isAuthenticated) {
    return next(req);
  }

  return next(attachAuthToken(accessToken, req)).pipe(
    catchError(e => {
      return handleAuthError(authService, router, e);
    })
  );
}

function attachAuthToken(token: string, req: HttpRequest<unknown>) {
  return req.clone({ params: new HttpParams().set('auth', token) });
}

function handleAuthError(
  authService: AuthService,
  router: Router,
  err: HttpErrorResponse
): Observable<any> {
  if (err.status === HttpStatusCode.Unauthorized) {
    authService.reset();
    router.navigateByUrl('/recipe-app/auth/login');
    return of(EMPTY);
  }

  return throwError(() => err);
}
