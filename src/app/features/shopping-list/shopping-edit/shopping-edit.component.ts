import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

import { ShoppingListService } from '../state/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { SelectComponent } from 'src/app/shared/ui/select/select.component';
import { SelectOptionComponent } from 'src/app/shared/ui/select/select-option/select-option.component';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
  imports: [FormsModule, NgIf, SelectComponent, SelectOptionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form', { static: true }) form!: NgForm;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.form.statusChanges?.subscribe(data => {
      console.dir(data);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.shoppingListService.addIngredient(
        new Ingredient(this.form.value.name, Number(this.form.value.amount))
      );
    }
  }
}
