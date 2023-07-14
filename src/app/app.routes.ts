import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'router-app',
    loadChildren: () =>
      import('./router-app/router.routes').then(p => p.routerPageRoutes),
  },
  {
    path: 'error',
    title: 'Error Page',
    loadComponent: () =>
      import('./shared/components/error-page/error-page.component').then(
        a => a.ErrorPageComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'router-app',
  },
];
