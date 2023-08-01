import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { Subscription } from 'rxjs';

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
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: true }) ngForm!: NgForm;
  startedEditingSubscription!: Subscription;
  editMode = false;

  constructor(private readonly shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.startedEditingSubscription =
      this.shoppingListService.startedEditing.subscribe((index: number) => {
        console.log(index);
        this.editMode = true;
      });
  }

  ngOnDestroy() {
    this.startedEditingSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.ngForm.valid) {
      this.shoppingListService.addIngredient(
        new Ingredient(this.ngForm.value.name, Number(this.ngForm.value.amount))
      );
      this.ngForm.reset();
    }
  }
}
