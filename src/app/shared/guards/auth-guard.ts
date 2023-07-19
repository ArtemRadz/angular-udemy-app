import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().then((authenticated: boolean) => {
    if (authenticated) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  });
};
