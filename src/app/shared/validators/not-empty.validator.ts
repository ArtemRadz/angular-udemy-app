import { AbstractControl, ValidatorFn } from '@angular/forms';

export const notEmptyValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  const value = control.value ?? '';

  if (typeof value === 'number') {
    return null;
  }

  if (value.trim().length === 0) {
    return { required: true };
  }

  return null;
};
