import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Sugar', 2),
    new Ingredient('Flour', 3),
    new Ingredient('Eggs', 4),
    new Ingredient('Milk', 1),
  ];

  private _ingredientChanged = new EventEmitter<Ingredient[]>();

  get ingredientChanged() {
    return this._ingredientChanged;
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
