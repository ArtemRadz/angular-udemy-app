import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ValidationErrors } from '@angular/forms';

import { TranslateErrorsPipe } from '../translate-errors.pipe';

@Component({
  selector: 'app-form-error',
  standalone: true,
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  imports: [TranslateErrorsPipe, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
  @Input() errors!: ValidationErrors | null;
}
