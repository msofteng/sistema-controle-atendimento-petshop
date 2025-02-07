import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PetshopService } from '../../shared/services/petshop.service';
import { of, throwError } from 'rxjs';
import HttpErrorResponse from '../../core/errors/http-error-response';
import { Usuario } from '../../shared/interfaces/petshop.entities';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let service: jasmine.SpyObj<PetshopService>;

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

    await TestBed.configureTestingModule({
      imports: [
        MainPageComponent
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
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;
    
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