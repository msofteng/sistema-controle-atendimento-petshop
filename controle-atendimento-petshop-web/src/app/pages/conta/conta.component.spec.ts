import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Usuario } from '../../shared/interfaces/petshop.entities';
import { PetshopService } from '../../shared/services/petshop.service';
import { ContaComponent } from './conta.component';

describe('ContaComponent', () => {
  let component: ContaComponent;
  let fixture: ComponentFixture<ContaComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj('PetshopService', [
      'login',
      'cadastrarFuncionario'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ContaComponent
      ],
      providers: [
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContaComponent);
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
    service.cadastrarFuncionario.and.returnValue(of(usuario));

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});