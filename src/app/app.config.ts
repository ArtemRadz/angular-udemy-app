import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { appRoutes } from './app.routes';
import { AUTH_INIT } from './features/auth/auth-initializer';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { FlagBasedPreloadingStrategy } from './shared/util/preloading-strategy/flag-based.preloading-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withPreloading(FlagBasedPreloadingStrategy)),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(),
    AUTH_INIT,
  ],
};
