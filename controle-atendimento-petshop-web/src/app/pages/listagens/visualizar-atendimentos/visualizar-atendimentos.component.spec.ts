import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PetshopService } from '../../../shared/services/petshop.service';
import { VisualizarAtendimentosComponent } from './visualizar-atendimentos.component';

describe('VisualizarAtendimentosComponent', () => {
  let component: VisualizarAtendimentosComponent;
  let fixture: ComponentFixture<VisualizarAtendimentosComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj('PetshopService', [
      'listarAtendimentos',
      'listarClientes',
      'listarRacas',
      'cadastrarAtendimento',
      'excluirAtendimento',
      'listarPets'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        VisualizarAtendimentosComponent
      ],
      providers: [
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarAtendimentosComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;

    service.listarAtendimentos.and.returnValue(of([]));
    service.listarClientes.and.returnValue(of([]));
    service.listarRacas.and.returnValue(of([]));
    service.listarPets.and.returnValue(of([]));
    service.cadastrarAtendimento.and.returnValue(of({
      id: 0,
      descricao: '',
      valor: 0,
      data: '',
      pets: []
    }));
    service.excluirAtendimento.and.returnValue(of(true));

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});