import { Injectable, computed } from '@angular/core';

import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery {
  readonly user = this.store.user.asReadonly();
  readonly accessToken = this.store.accessToken.asReadonly();

  readonly isAuthenticated = computed(() => {
    const user = this.store.user();

    return this.store.accessToken() && user && new Date() < user.expirationDate;
  });

  constructor(private store: AuthStore) {}
}
