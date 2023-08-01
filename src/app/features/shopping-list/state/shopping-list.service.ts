import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';

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

  private _startedEditing = new Subject<number>();
  private _ingredientChanged = new Subject<Ingredient[]>();

  get ingredientChanged() {
    return this._ingredientChanged;
  }

  get startedEditing() {
    return this._startedEditing;
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.addIngredientOrIncreaseAmountOfExisting(ingredient);

    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]) {
    newIngredients.forEach(ingredient => {
      this.addIngredientOrIncreaseAmountOfExisting(ingredient);
    });

    this.ingredientChanged.next(this.ingredients.slice());
  }

  private addIngredientOrIncreaseAmountOfExisting(ingredient: Ingredient) {
    const existingIngredient = this.getIngredientIfExists(ingredient);

    if (existingIngredient) {
      existingIngredient.amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
  }

  private getIngredientIfExists(ingredient: Ingredient) {
    return this.ingredients.find(
      i => i.name.toLowerCase() === ingredient.name.toLowerCase()
    );
  }
}
