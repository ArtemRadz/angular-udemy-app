import { Routes } from '@angular/router';

export const serversRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        title: 'Servers List',
        loadComponent: () =>
          import('./servers.component').then(a => a.ServersComponent),
      },
      {
        path: ':id/edit',
        title: 'Edit Server',
        loadComponent: () =>
          import('./edit-server/edit-server.component').then(
            a => a.EditServerComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
    ],
  },
];
