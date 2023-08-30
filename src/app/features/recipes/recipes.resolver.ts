import { inject } from '@angular/core';

import { RecipesService } from './state/recipes.service';

export const recipesResolver = () => {
  return inject(RecipesService).fetchRecipes();
};
