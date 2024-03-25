import { inject, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { ErrorTranslationService } from './error-translation.service';

@Pipe({
  name: 'appTranslateErrors',
  standalone: true,
})
export class TranslateErrorsPipe implements PipeTransform {
  private readonly errorTranslationService = inject(ErrorTranslationService);
  transform(errors: ValidationErrors | null): Observable<string> {
    if (!errors) {
      return of('');
    }
    const keys = Object.keys(errors);
    return this.errorTranslationService.translate(keys[0]);
  }
}
