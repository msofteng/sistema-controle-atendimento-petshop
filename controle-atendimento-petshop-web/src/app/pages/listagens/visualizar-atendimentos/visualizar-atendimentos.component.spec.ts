import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PetshopService } from '../../../shared/services/petshop.service';
import { VisualizarAtendimentosComponent } from './visualizar-atendimentos.component';
import { Atendimento, Cliente, Pet, Raca } from '../../../shared/interfaces/petshop.entities';
import { Perfil } from '../../../shared/enums/perfil';
import { HttpErrorResponse } from '@angular/common/http';

describe('VisualizarAtendimentosComponent', () => {
  let component: VisualizarAtendimentosComponent;
  let fixture: ComponentFixture<VisualizarAtendimentosComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  let clienteMock: Cliente = {
    id: 1,
    nome: 'mateus',
    perfil: Perfil.CLIENTE,
    senha: '123',
    dataCadastro: new Date(),
    cpf: 12345678910,
    contatos: [],
    enderecos: []
  };

  let racaMock: Raca = {
    id: 1,
    descricao: 'vira lata'
  };

  let petMock = {
    id: 1,
    nome: 'caramelo',
    dataNascimento: new Date(),
    cliente: clienteMock,
    raca: []
  };

  let atendimentoMock: Atendimento = {
    id: 1,
    descricao: 'teste',
    valor: 200,
    data: new Date(),
    pets: Array.from({ length: 30 }).map((_, index) => ({ ...petMock, id: index + 1 }))
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

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando o método atendimentoAdicionado que recebe um atendimento para enviar', () => {
    // com sucesso
    component.clientes = Array.from({ length: 30 }).map((_, index) => ({ ...clienteMock, id: index + 1 }));
    service.cadastrarAtendimento.and.returnValue(of(atendimentoMock));

    component.atendimentoAdicionado(atendimentoMock);
    expect(service.cadastrarAtendimento).toBeTruthy();

    // com erro
    service.cadastrarAtendimento.and.returnValue(throwError(() => errorMock));

    component.atendimentoAdicionado(atendimentoMock);
    expect(service.cadastrarAtendimento).toBeTruthy();
  });

  it('testando o método editarAtendimento', () => {
    component.editarAtendimento(atendimentoMock);

    expect(component.atendimentoSelecionadoEdicao).toBeTruthy();
  });

  it('testando o método excluirAtendimento', () => {
    // com sucesso
    service.excluirAtendimento.and.returnValue(of(true));
    component.atendimentos = Array.from({ length: 30 }).map((_, index) => ({ 
      ...atendimentoMock,
      id: index + 1
    }));
    component.excluirAtendimento(atendimentoMock);

    expect(service.excluirAtendimento).toBeTruthy();

    // com erro
    service.excluirAtendimento.and.returnValue(throwError(() => errorMock));
    component.excluirAtendimento(atendimentoMock);

    expect(service.excluirAtendimento).toBeTruthy();

    // testando tipos distintos de dataCadastro do cliente
    component.excluirAtendimento({
      ...atendimentoMock,
      pets: atendimentoMock.pets.map(pet => ({
        ...pet,
        cliente: {
          ...pet.cliente,
          dataCadastro: new Date()
        }
      }))
    });
    
    component.excluirAtendimento({
      ...atendimentoMock,
      pets: atendimentoMock.pets.map(pet => ({
        ...pet,
        cliente: {
          ...pet.cliente,
          dataCadastro: '2024-08-12'
        }
      }))
    });
  });

  it('testando a formatação de raças dos pets', () => {
    expect(component.formatarRacas(['vira lata', 'pit bull'].map((descricao, index) => ({ id: index + 1, descricao })))).toBe('vira lata, pit bull');
    expect(component.formatarRacas()).toBe('-');
  });

  it('testando busca de animais do cliente', () => {
    // com sucesso
    service.listarPets.and.returnValue(of(Array.from({ length: 30 }).map((_, index) => ({ ...petMock, id: index + 1 }))));
    component.buscarAnimaisCliente(clienteMock);

    expect(component.buscarAnimaisCliente).toBeTruthy();

    // simulando um erro
    service.listarPets.and.returnValue(throwError(() => errorMock));
    component.buscarAnimaisCliente(clienteMock);

    expect(component.buscarAnimaisCliente).toBeTruthy();
  });

  it('simulando erros nas listagens', () => {
    service.listarAtendimentos.and.returnValue(throwError(() => errorMock));
    service.listarClientes.and.returnValue(throwError(() => errorMock));
    service.listarRacas.and.returnValue(throwError(() => errorMock));

    component.listarAtendimentosClientesRacasPet();

    expect(service.listarAtendimentos).toBeTruthy();
    expect(service.listarClientes).toBeTruthy();
    expect(service.listarRacas).toBeTruthy();
  });
});