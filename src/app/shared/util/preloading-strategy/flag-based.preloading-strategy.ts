import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';

import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlagBasedPreloadingStrategy extends PreloadingStrategy {
  preload(route: Route, fn: () => Observable<unknown>): Observable<unknown> {
    return route.data?.['preload'] === true ? fn() : of(null);
  }
}
