import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url !== '/auth/login' && req.url !== '/auth/signup') {
    req.headers.append('Authorization', `Bearer ${10}`);
  }

  req = req.clone({
    ...req,
    url: 'http://localhost:8080' + req.url,
    withCredentials: true,
    headers: req.headers
  });

  return next(req);
};