import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PetshopService } from '../../../shared/services/petshop.service';
import { VisualizarClientesComponent } from './visualizar-clientes.component';

describe('VisualizarClientesComponent', () => {
  let component: VisualizarClientesComponent;
  let fixture: ComponentFixture<VisualizarClientesComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj('PetshopService', [
      'listarClientes',
      'cadastrarCliente',
      'excluirCliente'
    ]);
    
    await TestBed.configureTestingModule({
      imports: [
        VisualizarClientesComponent
      ],
      providers: [
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarClientesComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;

    service.listarClientes.and.returnValue(of([]));
    service.cadastrarCliente.and.returnValue(of({
      id: 0,
      nome: '',
      perfil: '',
      senha: '',
      dataCadastro: '',
      contatos: [],
      enderecos: []
    }));
    service.excluirCliente.and.returnValue(of(true));

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});