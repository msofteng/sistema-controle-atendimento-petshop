import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from './login.component';
import { PetshopService } from '../../shared/services/petshop.service';
import { of } from 'rxjs';
import { Usuario } from '../../shared/interfaces/petshop.entities';

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

    let usuario: Usuario = {
      id: 0,
      nome: '',
      perfil: '',
      senha: '',
      cpf: 0,
      foto: ''
    };

    service.login.and.returnValue(of(usuario));
    
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});