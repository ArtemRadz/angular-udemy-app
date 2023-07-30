import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { ShoppingListService } from '../state/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { SelectComponent } from 'src/app/shared/ui/select/select.component';
import { SelectOptionComponent } from 'src/app/shared/ui/select/select-option/select-option.component';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
  imports: [
    FormsModule,
    NgIf,
    SelectComponent,
    SelectOptionComponent,
    NgFor,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form', { static: true }) ngForm!: NgForm;

  reactiveForm!: FormGroup;

  constructor(
    private shoppingListService: ShoppingListService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    console.log('init');
    this.reactiveForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [1, [Validators.min(1), Validators.required]],
      type: 'fruit',
    });
  }

  onSubmit() {
    console.dir(this.reactiveForm);
    if (this.reactiveForm.valid) {
      this.shoppingListService.addIngredient(
        new Ingredient(
          this.reactiveForm.value.name,
          Number(this.reactiveForm.value.amount)
        )
      );
      this.reactiveForm.reset({
        type: 'fruit',
      });
    }
    // if (this.ngForm.valid) {
    //   console.dir(this.ngForm);
    //   this.shoppingListService.addIngredient(
    //     new Ingredient(this.ngForm.value.name, Number(this.ngForm.value.amount))
    //   );
    //   this.ngForm.reset({
    //     type: 'fruit',
    //   });
    // }
  }
}
