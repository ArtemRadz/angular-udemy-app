import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorTranslationService {
  errors: { [key: string]: string } = {
    EMAIL_EXISTS: 'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER:
      'We have blocked all requests from this device due to unusual activity. Try again later.',
    INVALID_LOGIN_CREDENTIALS: 'Invalid username or password.',
    USER_DISABLED: 'The user account has been disabled by an administrator.',
    INTERNAL_SERVER_ERROR: 'Something went wrong. Please contact support.',
  };

  translate(value: string): Observable<string> {
    return of(this.errors[value]);
  }
}
