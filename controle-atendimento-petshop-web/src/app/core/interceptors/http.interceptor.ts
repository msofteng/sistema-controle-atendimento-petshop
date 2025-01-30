import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    ...req,
    url: 'https://localhost:8080' + req.url,
    withCredentials: true
  });

  return next(req);
};