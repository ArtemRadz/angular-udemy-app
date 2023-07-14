import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        title: 'Users List',
        loadComponent: () =>
          import('./users.component').then(a => a.UsersComponent),
      },
      {
        path: ':id',
        title: 'User Detail',
        loadComponent: () =>
          import('./user/user.component').then(a => a.UserComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
    ],
  },
];
