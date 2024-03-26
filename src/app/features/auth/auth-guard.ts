import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthQuery } from 'src/app/features/auth/state/auth.query';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(AuthQuery).isAuthenticated();
  const router = inject(Router);

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/recipe-app/auth/login'], {
      queryParams: { redirectUrl: state.url },
    });
    return false;
  }
};
