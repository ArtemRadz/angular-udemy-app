import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'recipe-app',
    pathMatch: 'full',
  },
  {
    path: 'router-app',
    loadChildren: () =>
      import('./router-app/router.routes').then(p => p.routerPageRoutes),
  },
  {
    path: 'recipe-app',
    loadChildren: () =>
      import('./features/recipe.routes').then(p => p.recipePageRoutes),
  },
  {
    path: 'posts-app',
    loadChildren: () =>
      import('./posts-app/posts.routes').then(p => p.postsPageRoutes),
  },
  {
    path: 'error',
    title: 'Error Page',
    data: { message: 'Page not found' },
    loadComponent: () =>
      import('./shared/components/error-page/error-page.component').then(
        a => a.ErrorPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
