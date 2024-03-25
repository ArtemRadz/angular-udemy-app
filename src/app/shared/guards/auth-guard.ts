import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthQuery } from 'src/app/features/auth/state/auth.query';

export const authGuard: CanActivateFn = (route, state) => {
  return (
    inject(AuthQuery).isAuthenticated() ||
    inject(Router).navigate(['recipe-app/auth/login'])
  );
};
