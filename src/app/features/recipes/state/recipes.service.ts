import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  static id = 1;
  private recipes: Recipe[] = [
    new Recipe(
      RecipesService.id,
      'Spaghetti Bolognese',
      'Classic Italian pasta dish with tomato sauce and ground beef.',
      'https://media.istockphoto.com/id/652225084/photo/spaghetti-bolognese-on-a-white-plate.jpg?s=612x612&w=0&k=20&c=taRaaNAkF_IZYccGTfM3rCoiMLiUBCA2Sc6CHB4Yb2k=',
      [
        new Ingredient('Ground beef', 0.5),
        new Ingredient('Onion', 1),
        new Ingredient('Garlic', 2),
        new Ingredient('Canned diced tomatoes', 0.4),
        new Ingredient('Tomato paste', 2),
      ]
    ),
    new Recipe(
      ++RecipesService.id,
      'Chocolate Cake',
      'Rich and moist chocolate cake topped with creamy chocolate frosting.',
      'https://media.istockphoto.com/id/1370520449/photo/slice-of-chocolate-cake-with-glaze.jpg?s=612x612&w=0&k=20&c=KK-h7w4l0FNA0YMWvkr1X8UrAAB77z0f5tTByBYgReM=',
      [
        new Ingredient('Flour', 2),
        new Ingredient('Granulated sugar', 2),
        new Ingredient('Cocoa powder', 3),
        new Ingredient('Baking powder', 1),
        new Ingredient('Baking soda:', 1),
      ]
    ),
    new Recipe(
      ++RecipesService.id,
      'Chicken Curry',
      'A flavorful Indian curry dish made with tender chicken pieces and aromatic spices.',
      'https://media.istockphoto.com/id/162524197/photo/chicken-curry-and-rice-on-black-plate-on-bamboo-matting.jpg?s=612x612&w=0&k=20&c=LOlfCxc2psg4zTq2Ph3wvIyITJTLSQb6BqhnDkAxJYQ=',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Onion', 1),
        new Ingredient('Garlic', 4),
        new Ingredient('Canned diced tomatoes', 0.4),
        new Ingredient('Tomato paste', 2),
      ]
    ),
  ];

  private _recipesChanged = new Subject<Recipe[]>();

  get recipesChanged() {
    return this._recipesChanged;
  }

  getRecipeById(id: number) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipeById(id: number) {
    const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex !== -1) {
      this.recipes.splice(recipeIndex, 1);
      this.recipesChanged.next(this.getRecipes());
    }
  }

  updateRecipeById(id: number, newRecipe: Recipe) {
    const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex !== -1) {
      this.recipes[recipeIndex] = newRecipe;
      this.recipesChanged.next(this.getRecipes());
    }
  }
}
