import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./login/login.component').then(a => a.LoginComponent),
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () =>
      import('./register/register.component').then(a => a.RegisterComponent),
  },
  { path: '**', redirectTo: 'login' },
];
