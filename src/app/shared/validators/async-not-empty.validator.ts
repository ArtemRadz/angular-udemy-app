import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

import { delay, map, Observable, of } from 'rxjs';

export const asyncNotEmptyValidator: AsyncValidatorFn = (
  control: AbstractControl
): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  const value = control.value ?? '';

  return of(null).pipe(
    delay(1000),
    map(() => {
      if (typeof value === 'number') {
        return null;
      }

      if (value.trim().length === 0) {
        return { required: true };
      }

      return null;
    })
  );
};
