import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { finalize } from 'rxjs';

import { notEmptyValidator } from 'src/app/shared/validators/not-empty.validator';
import { AuthService } from '../state/auth.service';
import { setFormErrors } from 'src/app/shared/ui/form-message/set-form-errors.pipe';
import { FormErrorComponent } from 'src/app/shared/ui/form-message/form-error/form-error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, FormErrorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

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
        .signIn(this.form.value)
        .pipe(
          setFormErrors(this.form),
          finalize(() => {
            this.cf.markForCheck();
          })
        )
        .subscribe(() => {
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
