import { HttpInterceptorFn } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { httpInterceptor } from './http.interceptor';

describe('httpInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => httpInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('deve ser criado', () => {
    expect(interceptor).toBeTruthy();
  });

  it('deve adicionar a URL base "http://localhost:8080"', (done) => {
    const mockRequest: any = {
      url: '',
      clone: jasmine.createSpy('clone').and.callFake((updated) => ({
        ...mockRequest,
        ...updated,
      })),
    };

    const mockNext: any = jasmine.createSpy('next').and.callFake((updatedReq) => {
      expect(updatedReq.url).toBe('http://localhost:8080');
      done();
    });

    interceptor(mockRequest, mockNext);
    expect(mockRequest.clone).toHaveBeenCalledWith({
      ...mockRequest,
      url: 'http://localhost:8080',
      withCredentials: true,
    });
  });

  it('deve habilitar "withCredentials"', (done) => {
    const mockRequest: any = {
      url: '/api/secure',
      clone: jasmine.createSpy('clone').and.callFake((updated) => ({
        ...mockRequest,
        ...updated,
      })),
    };

    const mockNext: any = jasmine.createSpy('next').and.callFake((updatedReq) => {
      expect(updatedReq.withCredentials).toBeTrue();
      done();
    });

    interceptor(mockRequest, mockNext);
    expect(mockRequest.clone).toHaveBeenCalledWith({
      ...mockRequest,
      url: 'http://localhost:8080/api/secure',
      withCredentials: true,
    });
  });
});