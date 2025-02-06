import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  const headers = req.headers || new HttpHeaders();

  req = req.clone({
    ...req,
    url: 'http://localhost:8080' + req.url,
    withCredentials: true,
    headers: (req.url !== '/auth/login' && req.url !== '/auth/signup') ?
      headers.append('Authorization', `Bearer ${cookieService.get('token')}`) :
      headers
  });

  return next(req);
};