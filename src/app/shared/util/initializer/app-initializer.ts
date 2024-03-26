import { ENVIRONMENT_INITIALIZER, Provider } from '@angular/core';

export function attachInitEffect(fn: VoidFunction): Provider {
  return {
    multi: true,
    provide: ENVIRONMENT_INITIALIZER,
    useValue: fn,
  };
}
