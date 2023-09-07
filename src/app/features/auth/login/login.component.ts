import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { notEmptyValidator } from 'src/app/shared/validators/not-empty.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    console.dir(this.form.value);
  }

  private initForm() {
    this.form = this.formBuilder.group({
      email: ['', [notEmptyValidator, Validators.email]],
      password: ['', [notEmptyValidator]],
    });
  }
}
