import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarRacasComponent } from './visualizar-racas.component';
import { PetshopService } from '../../../shared/services/petshop.service';
import { of } from 'rxjs';

describe('VisualizarRacasComponent', () => {
  let component: VisualizarRacasComponent;
  let fixture: ComponentFixture<VisualizarRacasComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj('PetshopService', [
      'listarRacas',
      'cadastrarRaca',
      'excluirRaca'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        VisualizarRacasComponent
      ],
      providers: [
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarRacasComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;

    service.listarRacas.and.returnValue(of([]));
    service.cadastrarRaca.and.returnValue(of({
      id: 1,
      descricao: 'vira-lata'
    }));
    service.excluirRaca.and.returnValue(of(true));

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});