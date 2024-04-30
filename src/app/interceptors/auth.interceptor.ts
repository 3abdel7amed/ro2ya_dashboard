import { HttpInterceptorFn } from '@angular/common/http';
import { Constants } from '../constants/constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem(Constants.access_token);

  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  return next(req);
};
