import { Injectable } from '@angular/core';

import { LoggingService } from 'src/app/shared/services/logging.service';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private _activeCounter = 0;
  private _inactiveCounter = 0;

  get activeCounter() {
    return this._activeCounter;
  }

  set activeCounter(counter: number) {
    this._activeCounter = counter;
  }

  get inactiveCounter() {
    return this._inactiveCounter;
  }

  set inactiveCounter(counter: number) {
    this._inactiveCounter = counter;
  }

  constructor(private loggingService: LoggingService) {}

  addToActive() {
    this.activeCounter++;
    this.loggingService.log(`Active count: ${this.activeCounter}`);
  }

  addToInactive() {
    this.inactiveCounter++;
    this.loggingService.log(`Inactive count: ${this.inactiveCounter}`);
  }
}
