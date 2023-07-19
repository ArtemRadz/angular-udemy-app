import { CanDeactivateFn } from '@angular/router';

export const canDeactivataGuard: CanDeactivateFn<unknown> = (
  component: any,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate();
};
