import { CanActivateFn } from '@angular/router';

export const wrapperGuard: CanActivateFn = (route, state) => {
  return true;
};
