import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { appRoutes } from './app.routes';
import { authInterceptor } from './shared/interceptors/auth.interceptor.ts';
import { AUTH_INIT } from './features/auth/auth-initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    // provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(),
    AUTH_INIT,
  ],
};
