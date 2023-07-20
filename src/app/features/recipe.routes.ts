import { Routes } from '@angular/router';

export const recipePageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'shopping-list',
        loadChildren: () =>
          import('./shopping-list/shopping-list.routes').then(
            a => a.shoppingListRoutes
          ),
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('./recipes/recipes.routes').then(a => a.recipesRoutes),
      },
      {
        path: '',
        redirectTo: 'recipes',
        pathMatch: 'full',
      },
    ],
  },
];
