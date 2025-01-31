import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarPetsComponent } from './visualizar-pets.component';
import { PetshopService } from '../../../shared/services/petshop.service';
import { of } from 'rxjs';
import { Pet } from '../../../shared/interfaces/petshop.entities';

describe('VisualizarPetsComponent', () => {
  let component: VisualizarPetsComponent;
  let fixture: ComponentFixture<VisualizarPetsComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj('PetshopService', [
      'listarPets',
      'listarRacas',
      'cadastrarPet',
      'excluirPet'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        VisualizarPetsComponent
      ],
      providers: [
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarPetsComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;

    service.listarPets.and.returnValue(of([]));
    service.listarRacas.and.returnValue(of([]));
    service.cadastrarPet.and.returnValue(of({
      id: 0,
      nome: '',
      dataNascimento: '',
      cliente: {
        dataCadastro: '',
        contatos: [],
        enderecos: [],
        id: 0,
        nome: '',
        perfil: '',
        senha: ''
      },
      raca: []
    }));
    service.excluirPet.and.returnValue(of(true));

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});