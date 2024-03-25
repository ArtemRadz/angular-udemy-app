import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form-success',
  standalone: true,
  templateUrl: './form-success.component.html',
  styleUrls: ['./form-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSuccessComponent {}
