import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export function setHeaders(headers: HttpHeaders, url: string, token: string): HttpHeaders {
  if (url == '/auth/login' || url == '/auth/signup') {
    return headers;
  } else {
    return headers.append('Authorization', `Bearer ${token}`);
  }
}

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  const headers = req.headers || new HttpHeaders();

  req = req.clone({
    ...req,
    url: 'http://localhost:8080' + req.url,
    withCredentials: true,
    headers: setHeaders(headers, req.url, cookieService.get('token'))
  });

  return next(req);
};