import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';

import {
  catchError,
  defer,
  MonoTypeOperatorFunction,
  Observable,
  throwError,
} from 'rxjs';

import { ApiError } from '../../data-access/firebase/models/api-error.model';

export function setFormErrors<T>(
  form: AbstractControl
): MonoTypeOperatorFunction<T> {
  return <T>(source: Observable<T>) => {
    return defer(() => {
      return source.pipe(
        catchError((error: HttpErrorResponse) => resolveFormErrors(error, form))
      );
    });
  };
}

function resolveFormErrors(_error: HttpErrorResponse, form: AbstractControl) {
  if (_error.status === HttpStatusCode.InternalServerError) {
    form.setErrors({ ['INTERNAL_SERVER_ERROR']: true });
  } else {
    const error = _error.error.error as ApiError;

    form.setErrors({ [error.message]: true });
  }

  return throwError(() => _error);
}
