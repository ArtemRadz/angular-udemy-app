import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from '../state/recipe.model';
import { RecipesService } from '../state/recipes.service';

export const recipeDetailResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Recipe | null => {
  const recipesService = inject(RecipesService);

  const recipe = recipesService.getRecipeById(Number(route.paramMap.get('id')));

  if (recipe) {
    return recipe;
  }

  return null;
};
