import { inject } from '@angular/core';

import { attachInitEffect } from 'src/app/shared/util/initializer/app-initializer';
import { AuthService } from './state/auth.service';

export const AUTH_INIT = attachInitEffect(() => {
  const authService = inject(AuthService);
  authService.initialize();
});
