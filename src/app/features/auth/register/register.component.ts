import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { finalize } from 'rxjs';

import { FormErrorComponent } from 'src/app/shared/ui/form-message/form-error/form-error.component';
import { FormSuccessComponent } from 'src/app/shared/ui/form-message/form-success/form-success.component';
import { setFormErrors } from 'src/app/shared/ui/form-message/set-form-errors.pipe';
import { notEmptyValidator } from 'src/app/shared/validators/not-empty.validator';
import { AuthService } from '../state/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormErrorComponent,
    FormSuccessComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  protected form!: FormGroup;
  protected successMessage = signal(false);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private cf: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService
        .signUp(this.form.value)
        .pipe(
          setFormErrors(this.form),
          finalize(() => {
            this.cf.markForCheck();
          })
        )
        .subscribe(() => {
          this.successMessage.set(true);
          this.form.reset();
        });
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      email: ['', [notEmptyValidator, Validators.email]],
      password: ['', [notEmptyValidator]],
    });
  }
}
