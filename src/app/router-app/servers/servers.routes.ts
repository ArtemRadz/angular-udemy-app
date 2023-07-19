import { Routes } from '@angular/router';

import { authGuard } from 'src/app/shared/guards/auth-guard';
import { canDeactivataGuard } from 'src/app/shared/guards/can-deactivata.guard';

export const serversRoutes: Routes = [
  {
    path: '',
    title: 'Servers List',
    canActivateChild: [authGuard],
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
        canDeactivate: [canDeactivataGuard],
        loadComponent: () =>
          import('./edit-server/edit-server.component').then(
            a => a.EditServerComponent
          ),
      },
    ],
  },
];
