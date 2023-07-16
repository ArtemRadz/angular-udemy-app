import { Routes } from '@angular/router';

export const routerPageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Router App',
        loadComponent: () =>
          import('./home/home.component').then(a => a.HomeComponent),
      },
      {
        path: 'servers',
        title: 'Servers',
        loadChildren: () =>
          import('./servers/servers.routes').then(a => a.serversRoutes),
      },
      {
        path: 'users',
        title: 'Users',
        loadChildren: () =>
          import('./users/users.routes').then(a => a.usersRoutes),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
      },
    ],
  },
];
