import { Injectable } from '@angular/core';

import { LoadingStore } from './loading.store';

@Injectable({ providedIn: 'root' })
export class LoadingQuery {
  readonly isLoading = this.store.isLoading.asReadonly();

  constructor(private readonly store: LoadingStore) {}
}
