import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    title: 'Users List',
    loadComponent: () =>
      import('./users.component').then(a => a.UsersComponent),
    children: [
      {
        path: ':id',
        title: 'User Detail',
        loadComponent: () =>
          import('./user/user.component').then(a => a.UserComponent),
      },
    ],
  },
];
