import { Routes } from '@angular/router';

import { authGuard } from '../shared/guards/auth-guard';

export const recipePageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'shopping-list',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./shopping-list/shopping-list.routes').then(
            a => a.shoppingListRoutes
          ),
      },
      {
        path: 'recipes',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./recipes/recipes.routes').then(a => a.recipesRoutes),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('../features/auth/auth.routes').then(a => a.authRoutes),
      },
      {
        path: '',
        redirectTo: 'recipes',
        pathMatch: 'full',
      },
    ],
  },
];
