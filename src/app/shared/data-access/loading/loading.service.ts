import { Injectable } from '@angular/core';

import { LoadingStore } from './loading.store';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private readonly loadingStore: LoadingStore) {}

  on() {
    this.loadingStore.isLoading.set(true);
  }

  off() {
    this.loadingStore.isLoading.set(false);
  }
}
