import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { httpInterceptor } from './core/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        httpInterceptor
      ])
    ),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-center',
      toastClass: 'ngx-toastr',
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      },
      preventDuplicates: true,
      enableHtml: true,
      timeOut: 10000,
      autoDismiss: false,
      closeButton: true,
      tapToDismiss: false,
      disableTimeOut: true
    })
  ]
};