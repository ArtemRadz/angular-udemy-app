import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      'Spaghetti Bolognese',
      'Classic Italian pasta dish with tomato sauce and ground beef.',
      'https://media.istockphoto.com/id/652225084/photo/spaghetti-bolognese-on-a-white-plate.jpg?s=612x612&w=0&k=20&c=taRaaNAkF_IZYccGTfM3rCoiMLiUBCA2Sc6CHB4Yb2k='
    ),
    new Recipe(
      'Chocolate Cake',
      'Rich and moist chocolate cake topped with creamy chocolate frosting.',
      'https://media.istockphoto.com/id/1370520449/photo/slice-of-chocolate-cake-with-glaze.jpg?s=612x612&w=0&k=20&c=KK-h7w4l0FNA0YMWvkr1X8UrAAB77z0f5tTByBYgReM='
    ),
    new Recipe(
      'Chicken Curry',
      'A flavorful Indian curry dish made with tender chicken pieces and aromatic spices.',
      'https://media.istockphoto.com/id/162524197/photo/chicken-curry-and-rice-on-black-plate-on-bamboo-matting.jpg?s=612x612&w=0&k=20&c=LOlfCxc2psg4zTq2Ph3wvIyITJTLSQb6BqhnDkAxJYQ='
    ),
  ];

  private _recipeSelected = new EventEmitter<Recipe>();

  get recipeSelected() {
    return this._recipeSelected;
  }

  getRecipes() {
    return this.recipes.slice();
  }

  selectRecipe(recipe: Recipe) {
    this._recipeSelected.emit(recipe);
  }
}
