import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let cookieServiceMock: jasmine.SpyObj<CookieService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    cookieServiceMock = jasmine.createSpyObj('CookieService', ['check']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: CookieService, useValue: cookieServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  it('deve redirecionar para /login se o token não estiver presente no cookie', () => {
    cookieServiceMock.check.and.returnValue(false);

    const result = executeGuard(ActivatedRouteSnapshot.prototype, RouterStateSnapshot.prototype);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });

  it('deve permitir a navegação se o token estiver presente no cookie', () => {
    cookieServiceMock.check.and.returnValue(true);

    const result = executeGuard(ActivatedRouteSnapshot.prototype, RouterStateSnapshot.prototype);

    expect(routerMock.navigate).not.toHaveBeenCalled();
    expect(result).toBeTrue();
  });
});