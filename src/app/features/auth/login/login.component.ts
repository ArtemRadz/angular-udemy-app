import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
  imports: [ReactiveFormsModule, RouterLink, FormErrorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  protected form!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cf: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const redirectUrl =
      this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') ??
      '/recipe-app/recipes';

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
          this.router.navigateByUrl(redirectUrl);
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
