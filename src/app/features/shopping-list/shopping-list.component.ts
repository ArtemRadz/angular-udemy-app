import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  imports: [ShoppingEditComponent, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Sugar', 2),
    new Ingredient('Flour', 3),
    new Ingredient('Eggs', 4),
    new Ingredient('Milk', 1),
  ];

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
