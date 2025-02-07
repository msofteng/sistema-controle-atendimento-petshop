import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Usuario } from '../../shared/interfaces/petshop.entities';
import { PetshopService } from '../../shared/services/petshop.service';
import { LoginComponent } from './login.component';

import HttpErrorResponse from '../../core/errors/http-error-response';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let service: jasmine.SpyObj<PetshopService>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
      'info',
      'warning'
    ]);
    service = jasmine.createSpyObj('PetshopService', [
      'login'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent
      ],
      providers: [
        {
          provide: ToastrService,
          useValue: toastrService
        },
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;
    
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando o método enviarLogin', () => {
    // testando o método enviarLogin normal

    let usuario: Usuario = {
      id: 1,
      nome: 'mateus',
      perfil: 'cliente',
      password: '123',
      cpf: '12345678901',
      dataCadastro: '2025-01-01'
    };

    component.loginForm = new FormGroup({
      nomeCpf: new FormControl<string>(usuario.cpf ?? '', []),
      password: new FormControl<string>(usuario.password, [])
    });

    service.login.and.returnValue(of({
      token: '123',
      expiresIn: 600
    }));

    component.enviarLogin(new SubmitEvent('submit'));

    expect(component.loginForm.get('nomeCpf')?.value).toBe(usuario.cpf);

    // testando o método enviarLogin com erro

    let errorMock = new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized',
      error: {
        message: 'Não autorizado'
      }
    });

    service.login.and.returnValue(throwError(() => errorMock));

    component.enviarLogin(new SubmitEvent('submit'));

    // com formulário vazio
    component.loginForm = new FormGroup({
      nomeCpf: new FormControl<string>(usuario.cpf ?? '', [Validators.required]),
      password: new FormControl<string>(usuario.password, [Validators.required])
    });
    component.loginForm.reset();
    component.enviarLogin(new SubmitEvent('submit'));
    expect(component.enviarLogin).toBeTruthy();
  });
});