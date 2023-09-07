import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { notEmptyValidator } from 'src/app/shared/validators/not-empty.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
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
