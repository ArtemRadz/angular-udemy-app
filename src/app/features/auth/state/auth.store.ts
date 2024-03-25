import { Injectable, signal } from '@angular/core';
import { User } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  user = signal<User | null>(null);
  accessToken = signal<string | null>(null);

  reset() {
    this.user.set(null);
    this.accessToken.set(null);
  }
}
