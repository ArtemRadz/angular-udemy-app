import { Routes } from '@angular/router';

export const serversRoutes: Routes = [
  {
    path: '',
    title: 'Servers List',
    loadComponent: () =>
      import('./servers.component').then(a => a.ServersComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./server/server.component').then(a => a.ServerComponent),
      },
      {
        path: ':id/edit',
        title: 'Edit Server',
        loadComponent: () =>
          import('./edit-server/edit-server.component').then(
            a => a.EditServerComponent
          ),
      },
    ],
  },
];
