import { Injectable } from '@angular/core';

import { Subject, map, tap } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  static id = 1;
  private recipes: Recipe[] = [];

  private _recipesChanged = new Subject<Recipe[]>();

  get recipesChanged() {
    return this._recipesChanged;
  }

  constructor(private httpClient: HttpClient) {}

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

  storeRecipes() {
    const recipes = this.getRecipes();
    this.httpClient
      .put(`${environment.firebaseUrl}/recipes.json`, recipes)
      .subscribe(data => console.dir(data));
  }

  fetchRecipes() {
    return this.httpClient
      .get<Recipe[]>(`${environment.firebaseUrl}/recipes.json`)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap(recipes => {
          RecipesService.id = recipes[recipes.length - 1].id;
          this.recipes = recipes;
          this.recipesChanged.next(this.getRecipes());
        })
      );
  }
}
