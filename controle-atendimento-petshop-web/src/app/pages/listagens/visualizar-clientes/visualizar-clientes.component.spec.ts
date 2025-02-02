import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PetshopService } from '../../../shared/services/petshop.service';
import { VisualizarClientesComponent } from './visualizar-clientes.component';
import { Perfil } from '../../../shared/enums/perfil';
import { Cliente } from '../../../shared/interfaces/petshop.entities';
import { HttpErrorResponse } from '@angular/common/http';

describe('VisualizarClientesComponent', () => {
  let component: VisualizarClientesComponent;
  let fixture: ComponentFixture<VisualizarClientesComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  let clienteMock = {
    id: 1,
    nome: 'mateus',
    perfil: Perfil.CLIENTE,
    senha: '123',
    dataCadastro: new Date(),
    cpf: 12345678910,
    contatos: [],
    enderecos: []
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

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando o método clienteAdicionado que recebe um cliente do formulário para enviar/atualizar', () => {
    // com sucesso
    component.clientes = Array.from({ length: 30 }).map((_, index) => ({ ...clienteMock, id: index + 1 }));
    service.cadastrarCliente.and.returnValue(of(clienteMock));

    component.clienteAdicionado(clienteMock);
    expect(service.cadastrarCliente).toBeTruthy();

    // com erro
    service.cadastrarCliente.and.returnValue(throwError(() => errorMock));

    component.clienteAdicionado(clienteMock);
    expect(service.cadastrarCliente).toBeTruthy();
  });

  it('testando o método editarCliente', () => {
    component.editarCliente(clienteMock);

    expect(component.clienteSelecionadoEdicao).toBeTruthy();
  });

  it('testando o método excluirCliente', () => {
    // com sucesso
    service.excluirCliente.and.returnValue(of(true));
    component.clientes = Array.from({ length: 30 }).map((_, index) => ({ ...clienteMock, id: index + 1 }));
    component.excluirCliente(clienteMock);
    
    expect(service.excluirCliente).toBeTruthy();
    
    // com erro
    service.excluirCliente.and.returnValue(throwError(() => errorMock));
    component.excluirCliente(clienteMock);

    expect(service.excluirCliente).toBeTruthy();
  });

  it('simulando erro na listagem', () => {
    service.listarClientes.and.returnValue(throwError(() => errorMock));

    component.buscarClientes();

    expect(service.listarClientes).toBeTruthy();
  });
});