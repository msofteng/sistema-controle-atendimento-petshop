import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Usuario } from '../../shared/interfaces/petshop.entities';
import { PetshopService } from '../../shared/services/petshop.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj('PetshopService', [
      'cadastrarFuncionario',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent
      ],
      providers: [
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
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

    service.cadastrarFuncionario.and.returnValue(of(usuario));

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});