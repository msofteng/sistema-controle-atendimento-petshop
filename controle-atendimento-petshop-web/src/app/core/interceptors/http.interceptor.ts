import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    url: 'https://localhost:8080/api' + req.url
  });

  return next(req);
};