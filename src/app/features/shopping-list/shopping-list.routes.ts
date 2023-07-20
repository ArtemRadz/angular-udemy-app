import { Routes } from '@angular/router';

export const shoppingListRoutes: Routes = [
  {
    path: '',
    title: 'Shopping List',
    loadComponent: () =>
      import('./shopping-list.component').then(a => a.ShoppingListComponent),
  },
];
