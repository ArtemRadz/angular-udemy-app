import { Routes } from '@angular/router';

export const postsPageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Posts App',
        loadComponent: () =>
          import('./posts/posts.component').then(a => a.PostsComponent),
      },
    ],
  },
];
