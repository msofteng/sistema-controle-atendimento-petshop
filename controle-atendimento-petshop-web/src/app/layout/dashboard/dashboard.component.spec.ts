import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule, provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PetshopService } from '../../shared/services/petshop.service';
import { Usuario } from '../../shared/interfaces/petshop.entities';
import { of, throwError } from 'rxjs';
import HttpErrorResponse from '../../core/errors/http-error-response';
import { CookieService } from 'ngx-cookie-service';
import { routes } from '../../app.routes';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let service: jasmine.SpyObj<PetshopService>;
  let cookieService: jasmine.SpyObj<CookieService>;

  let usuarioMock: Usuario = {
    id: 1,
    nome: 'mateus',
    perfil: 'cliente',
    password: '123',
    cpf: '12345678901',
    dataCadastro: '2025-01-01'
  };

  let errorMock = new HttpErrorResponse({
    status: 401,
    statusText: 'Unauthorized',
    error: {
      status: 401,
      message: 'Não autorizado'
    }
  });

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot', 'params']);
    service = jasmine.createSpyObj('PetshopService', [
      'getUsuarioLogado',
      'setUsuario',
      'getUsuario'
    ]);
    cookieService = jasmine.createSpyObj('CookieService', ['delete']);

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        RouterModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        },
        {
          provide: PetshopService,
          useValue: service
        },
        {
          provide: CookieService,
          useValue: cookieService
        },
        provideRouter(routes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;

    service.getUsuarioLogado.and.returnValue(of(usuarioMock));
    service.getUsuario.and.returnValue(of(usuarioMock));

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando caso de usuário desconectado ou com token expirado', () => {
    service.getUsuarioLogado.and.returnValue(throwError(() => errorMock));

    component.ngOnInit();

    // ERRO interno
    errorMock.error.status = 500;
    service.getUsuarioLogado.and.returnValue(throwError(() => errorMock));
    component.ngOnInit();

    expect(component.cookieService.delete).toBeTruthy();
  });
});