import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> {
  const modifiedRequest = req.clone({
    headers: req.headers.append('Auth', 'Bearer 124sdfsfasdf'),
  });
  return next(modifiedRequest).pipe(
    tap(data => {
      console.dir(data);
    })
  );
}
