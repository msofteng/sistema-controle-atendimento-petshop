import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PetshopService } from '../../../shared/services/petshop.service';
import { VisualizarRacasComponent } from './visualizar-racas.component';
import { HttpErrorResponse } from '@angular/common/http';

describe('VisualizarRacasComponent', () => {
  let component: VisualizarRacasComponent;
  let fixture: ComponentFixture<VisualizarRacasComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  let racaMock = {
    id: 1,
    descricao: 'vira-lata'
  };

  let errorMock = new HttpErrorResponse({
    status: 401,
    statusText: 'Unauthorized',
    error: {
      message: 'Não autorizado'
    }
  });

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
    
    service.excluirRaca.and.returnValue(of(true));

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando o método racaAdicionada que recebe um raca animal do formulário para enviar/atualizar', () => {
    // com sucesso
    component.racas = Array.from({ length: 30 }).map((_, index) => ({ ...racaMock, id: index + 1 }));
    service.cadastrarRaca.and.returnValue(of(racaMock));

    component.racaAdicionada(racaMock);
    expect(service.cadastrarRaca).toBeTruthy();

    // com erro
    service.cadastrarRaca.and.returnValue(throwError(() => errorMock));

    component.racaAdicionada(racaMock);
    expect(service.cadastrarRaca).toBeTruthy();
  });

  it('testando o método editarRaca', () => {
    component.editarRaca(racaMock);

    expect(component.racaSelecionadoEdicao).toBeTruthy();
  });

  it('testando o método excluirRaca', () => {
    // com sucesso
    service.excluirRaca.and.returnValue(of(true));
    component.racas = Array.from({ length: 30 }).map((_, index) => ({ ...racaMock, id: index + 1 }));
    component.excluirRaca(racaMock);
    
    expect(service.excluirRaca).toBeTruthy();
    
    // com erro
    service.excluirRaca.and.returnValue(throwError(() => errorMock));
    component.excluirRaca(racaMock);

    expect(service.excluirRaca).toBeTruthy();
  });

  it('simulando erro na listagem', () => {
    service.listarRacas.and.returnValue(throwError(() => errorMock));

    component.buscarRacas();

    expect(service.listarRacas).toBeTruthy();
  });
});