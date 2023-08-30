import { Routes } from '@angular/router';
import { recipeDetailResolver } from './recipe-detail/recipe-detail.resolver';
import { recipesResolver } from './recipes.resolver';

export const recipesRoutes: Routes = [
  {
    path: '',
    title: 'Recipes',
    resolve: [recipesResolver],
    loadComponent: () =>
      import('./recipes.component').then(a => a.RecipesComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./recipe-start/recipe-start.component').then(
            a => a.RecipeStartComponent
          ),
      },
      {
        path: 'add',
        title: 'Add recipe',
        loadComponent: () =>
          import('./recipe-edit/recipe-edit.component').then(
            a => a.RecipeEditComponent
          ),
      },
      {
        path: ':id',
        title: 'Recipe Detail',
        resolve: {
          recipe: recipeDetailResolver,
        },
        loadComponent: () =>
          import('./recipe-detail/recipe-detail.component').then(
            a => a.RecipeDetailComponent
          ),
      },
      {
        path: ':id/edit',
        title: 'Edit recipe',
        loadComponent: () =>
          import('./recipe-edit/recipe-edit.component').then(
            a => a.RecipeEditComponent
          ),
      },
    ],
  },
];
