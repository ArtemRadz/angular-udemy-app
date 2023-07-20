import { Routes } from '@angular/router';

export const recipesRoutes: Routes = [
  {
    path: '',
    title: 'Recipes',
    loadComponent: () =>
      import('./recipes.component').then(a => a.RecipesComponent),
    children: [
      {
        path: 'recipe-detail',
        title: 'Recipe Detail',
        loadComponent: () =>
          import('./recipe-detail/recipe-detail.component').then(
            a => a.RecipeDetailComponent
          ),
      },
    ],
  },
];
