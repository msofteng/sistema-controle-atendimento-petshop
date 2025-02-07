import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Perfil } from '../../../shared/enums/perfil';
import { PetshopService } from '../../../shared/services/petshop.service';
import { VisualizarRacasComponent } from './visualizar-racas.component';

import HttpErrorResponse from '../../../core/errors/http-error-response';

describe('VisualizarRacasComponent', () => {
  let component: VisualizarRacasComponent;
  let fixture: ComponentFixture<VisualizarRacasComponent>;
  let service: jasmine.SpyObj<PetshopService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

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

  let adminMock = {
    id: 1,
    nome: 'mateus',
    perfil: Perfil.ADMIN,
    password: '123',
    dataCadastro: new Date(),
    cpf: '12345678910',
    foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
    contatos: [],
    enderecos: []
  };

  beforeEach(async () => {
    service = jasmine.createSpyObj('PetshopService', [
      'listarRacas',
      'cadastrarRaca',
      'excluirRaca',
      'getUsuario'
    ]);
    toastrService = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
      'info',
      'warning'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        VisualizarRacasComponent
      ],
      providers: [
        {
          provide: PetshopService,
          useValue: service
        },
        {
          provide: ToastrService,
          useValue: toastrService
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarRacasComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;

    service.listarRacas.and.returnValue(of([]));
    service.excluirRaca.and.returnValue(of(true));
    service.getUsuario.and.returnValue(of(adminMock));

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