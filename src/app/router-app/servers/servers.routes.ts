import { Routes } from '@angular/router';

import { canDeactivataGuard } from 'src/app/shared/guards/can-deactivata.guard';
import { serversResolver } from './servers.resolver';

export const serversRoutes: Routes = [
  {
    path: '',
    title: 'Servers List',
    loadComponent: () =>
      import('./servers.component').then(a => a.ServersComponent),
    children: [
      {
        path: ':id',
        resolve: {
          server: serversResolver,
        },
        loadComponent: () =>
          import('./server/server.component').then(a => a.ServerComponent),
      },
      {
        path: ':id/edit',
        title: 'Edit Server',
        canDeactivate: [canDeactivataGuard],
        loadComponent: () =>
          import('./edit-server/edit-server.component').then(
            a => a.EditServerComponent
          ),
      },
    ],
  },
];
