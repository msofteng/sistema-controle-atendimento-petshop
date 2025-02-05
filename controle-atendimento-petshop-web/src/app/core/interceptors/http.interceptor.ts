import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  req = req.clone({
    ...req,
    url: 'http://localhost:8080' + req.url,
    withCredentials: true,
    headers: (req.url !== '/auth/login' && req.url !== '/auth/signup') ? 
      req.headers.append('Authorization', `Bearer ${cookieService.get('token')}`) : 
      req.headers
  });

  return next(req);
};