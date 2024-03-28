import { Injectable, computed } from '@angular/core';

import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery {
  readonly user = this.store.user.asReadonly();
  readonly accessToken = this.store.accessToken.asReadonly();
  readonly refreshToken = this.store.refreshToken.asReadonly();

  readonly isAuthenticated = computed(() => {
    return (
      !!this.store.accessToken() &&
      !!this.store.refreshToken() &&
      !!this.store.user()
    );
  });

  constructor(private store: AuthStore) {}
}
