import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PetshopService } from './petshop.service';
import { LoginParams } from '../interfaces/login-params';
import { Atendimento, Cliente, Contato, Pet, Raca, Usuario } from '../interfaces/petshop.entities';
import { Perfil } from '../enums/perfil';
import { corrigeData } from '../functions/date';
import { changePerfil, changeTipoContato } from '../utils/change-enum';
import { PageParams } from '../interfaces/page-params';

describe('PetshopService', () => {
  let service: PetshopService;
  let httpMock: HttpTestingController;

  let adminMock = {
    id: 1,
    nome: 'mateus',
    perfil: Perfil.ADMIN,
    senha: '123',
    dataCadastro: new Date(),
    cpf: 12345678910,
    foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
    contatos: [
      {
        id: 1,
        tag: '',
        tipo: 'email',
        valor: 'mateus@mateus.com'
      }
    ],
    enderecos: []
  };

  let petMock = {
    id: 1,
    nome: 'caramelo',
    dataNascimento: new Date(),
    cliente: adminMock,
    raca: []
  };

  let atendimentoMock = {
    id: 1,
    descricao: 'teste',
    valor: 200,
    data: new Date(),
    pets: Array.from({ length: 30 }).map((_, index) => ({ ...petMock, id: index + 1 }))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PetshopService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve realizar o login com sucesso', () => {
    const loginParams: LoginParams = { nomeCpf: 'user', senha: 'password' };
  
    service.login(loginParams).subscribe(response => {
      expect(response).toEqual(adminMock);
    });
  
    const req = httpMock.expectOne('/NOT_IMPLEMENTED');
    expect(req.request.method).toBe('POST');
    req.flush(adminMock);
  });
  
  it('deve cadastrar um funcionario com sucesso', () => {
    service.cadastrarFuncionario(adminMock).subscribe(response => {
      expect(response).toEqual(adminMock);
      expect(response.perfil).toBe(Perfil.ADMIN);
    });
  
    const req = httpMock.expectOne('/funcionario/salvar');
    expect(req.request.method).toBe('POST');
    req.flush(adminMock);
  });

  it('deve cadastrar um cliente com sucesso', () => {
    const mockResponse: Cliente = {
      ...adminMock,
      perfil: changePerfil(adminMock.perfil),
      dataCadastro: corrigeData(new Date()),
      contatos: adminMock.contatos.map<Contato>(contato => ({
        ...contato,
        tipo: changeTipoContato(contato.tipo)
      }))
    };
  
    service.cadastrarCliente(adminMock).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const req = httpMock.expectOne('/cliente/salvar');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('deve cadastrar um atendimento com sucesso', () => {
    const mockResponse: Atendimento = {
      ...atendimentoMock,
      data: corrigeData(new Date(atendimentoMock.data)),
      pets: atendimentoMock.pets.map<Pet>(pet => ({
        ...pet,
        dataNascimento: corrigeData(new Date(pet.dataNascimento))
      }))
    };
  
    service.cadastrarAtendimento(atendimentoMock).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const req = httpMock.expectOne('/atendimento/salvar');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('deve cadastrar um pet com sucesso', () => {
    const mockResponse: Pet = {
      ...petMock,
      dataNascimento: corrigeData(new Date(petMock.dataNascimento))
    };
  
    service.cadastrarPet(petMock).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const req = httpMock.expectOne('/pet/salvar');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('deve cadastrar uma raça animal com sucesso', () => {
    const mockResponse: Raca = {
      id: 1,
      descricao: 'vira lata'
    };
  
    service.cadastrarRaca(mockResponse).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const req = httpMock.expectOne('/raca/salvar');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('deve excluir um funcionario com sucesso', () => {
    const mockResponse = { status: 204 };
  
    service.excluirFuncionario(adminMock).subscribe(response => {
      expect(response).toBeTrue();
    });
  
    const req = httpMock.expectOne('/funcionario/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse, { status: 204, statusText: 'No Content' });
  });
  
  it('deve retornar erro ao tentar excluir um funcionario', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
  
    service.excluirFuncionario(adminMock).subscribe({
      next: () => fail('Deveria ter falhado'),
      error: error => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });
  
    const req = httpMock.expectOne('/funcionario/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, mockError);
  });
  
  it('deve excluir um cliente com sucesso', () => {
    const mockResponse = { status: 204 };
  
    service.excluirCliente(adminMock).subscribe(response => {
      expect(response).toBeTrue();
    });
  
    const req = httpMock.expectOne('/cliente/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse, { status: 204, statusText: 'No Content' });
  });
  
  it('deve retornar erro ao tentar excluir um cliente', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
  
    service.excluirCliente(adminMock).subscribe({
      next: () => fail('Deveria ter falhado'),
      error: error => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });
  
    const req = httpMock.expectOne('/cliente/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, mockError);
  });

  it('deve excluir um endereco com sucesso', () => {
    const mockResponse = { status: 204 };
  
    service.excluirEndereco({
      id: 0,
      logradouro: '',
      cidade: '',
      bairro: ''
    }).subscribe(response => {
      expect(response).toBeTrue();
    });
  
    const req = httpMock.expectOne('/cliente/endereco/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse, { status: 204, statusText: 'No Content' });
  });
  
  it('deve retornar erro ao tentar excluir um endereco', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
  
    service.excluirEndereco({
      id: 0,
      logradouro: '',
      cidade: '',
      bairro: ''
    }).subscribe({
      next: () => fail('Deveria ter falhado'),
      error: error => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });
  
    const req = httpMock.expectOne('/cliente/endereco/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, mockError);
  });

  it('deve excluir um contato com sucesso', () => {
    const mockResponse = { status: 204 };
  
    service.excluirContato({
      id: 0,
      tag: '',
      tipo: '',
      valor: ''
    }).subscribe(response => {
      expect(response).toBeTrue();
    });
  
    const req = httpMock.expectOne('/cliente/contato/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse, { status: 204, statusText: 'No Content' });
  });
  
  it('deve retornar erro ao tentar excluir um contato', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
  
    service.excluirContato({
      id: 0,
      tag: '',
      tipo: '',
      valor: ''
    }).subscribe({
      next: () => fail('Deveria ter falhado'),
      error: error => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });
  
    const req = httpMock.expectOne('/cliente/contato/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, mockError);
  });

  it('deve excluir um atendimento com sucesso', () => {
    const mockResponse = { status: 204 };
  
    service.excluirAtendimento(atendimentoMock).subscribe(response => {
      expect(response).toBeTrue();
    });
  
    const req = httpMock.expectOne('/atendimento/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse, { status: 204, statusText: 'No Content' });
  });
  
  it('deve retornar erro ao tentar excluir um atendimento', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
  
    service.excluirAtendimento(atendimentoMock).subscribe({
      next: () => fail('Deveria ter falhado'),
      error: error => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });
  
    const req = httpMock.expectOne('/atendimento/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, mockError);
  });

  it('deve excluir um pet com sucesso', () => {
    const mockResponse = { status: 204 };
  
    service.excluirPet(petMock).subscribe(response => {
      expect(response).toBeTrue();
    });
  
    const req = httpMock.expectOne('/pet/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse, { status: 204, statusText: 'No Content' });
  });
  
  it('deve retornar erro ao tentar excluir um pet', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
  
    service.excluirPet(petMock).subscribe({
      next: () => fail('Deveria ter falhado'),
      error: error => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });
  
    const req = httpMock.expectOne('/pet/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, mockError);
  });

  it('deve excluir uma raca com sucesso', () => {
    const mockResponse = { status: 204 };
  
    service.excluirRaca({
      id: 0,
      descricao: ''
    }).subscribe(response => {
      expect(response).toBeTrue();
    });
  
    const req = httpMock.expectOne('/raca/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse, { status: 204, statusText: 'No Content' });
  });
  
  it('deve retornar erro ao tentar excluir um raca', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
  
    service.excluirRaca({
      id: 0,
      descricao: ''
    }).subscribe({
      next: () => fail('Deveria ter falhado'),
      error: error => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });
  
    const req = httpMock.expectOne('/raca/excluir');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, mockError);
  });

  it('deve listar os clientes com sucesso', () => {
    const filters: PageParams<Cliente> = { page: 1, qtd: 10 };

    const mockClientes: Cliente[] = Array.from({ length: 30 }).map((_, index) => ({
      ...adminMock,
      id: index + 1,
      contatos: index % 2 == 0 ? adminMock.contatos : null as any
    }));
  
    service.listarClientes(filters).subscribe(response => {
      expect(response.length).toBeGreaterThan(0);
      expect(response[0].nome).toBe('mateus');
    });
  
    const req = httpMock.expectOne('/cliente/listar');
    expect(req.request.method).toBe('POST');
    req.flush(mockClientes);
  });

  it('deve listar os pets com sucesso', () => {
    const filters: PageParams<Pet> = { page: 1, qtd: 10 };

    const mockPets: Pet[] = Array.from({ length: 30 }).map((_, index) => ({
      ...petMock,
      id: index + 1,
    }));
  
    service.listarPets(filters).subscribe(response => {
      expect(response.length).toBeGreaterThan(0);
      expect(response[0].nome).toBe('caramelo');
    });
  
    const req = httpMock.expectOne('/pet/listar');
    expect(req.request.method).toBe('POST');
    req.flush(mockPets);
  });

  it('deve listar as raças de pet com sucesso', () => {
    const filters: PageParams<Raca> = { page: 1, qtd: 10 };

    const mockRacas: Raca[] = Array.from({ length: 30 }).map((_, index) => ({
      id: index + 1,
      descricao: 'vira lata'
    }));
  
    service.listarRacas(filters).subscribe(response => {
      expect(response.length).toBeGreaterThan(0);
      expect(response[0].descricao).toBe('vira lata');
    });
  
    const req = httpMock.expectOne('/raca/listar');
    expect(req.request.method).toBe('POST');
    req.flush(mockRacas);
  });

  it('deve listar os atendimentos com sucesso', () => {
    const filters: PageParams<Atendimento> = { page: 1, qtd: 10 };
    
    const mockAtendimentos: Atendimento[] = Array.from({ length: 30 }).map((_, index) => ({
      ...atendimentoMock,
      id: index + 1,
      pets: index % 2 === 0
        ? atendimentoMock.pets.map<Pet>(pet => ({
          ...pet,
          dataNascimento: corrigeData(new Date(pet.dataNascimento)),
          cliente: {
            ...pet.cliente,
            dataCadastro: corrigeData(new Date(pet.cliente.dataCadastro)),
            contatos: index % 3 === 0
              ? pet.cliente.contatos?.map<Contato>(contato => ({
                ...contato,
                tipo: changeTipoContato(contato.tipo)
              }))
              : undefined as any
          }
        }))
        : undefined as any,
    }));

    service.listarAtendimentos(filters).subscribe(response => {
      expect(response.length).toBeGreaterThan(0);
      expect(response[0].descricao).toBe('teste');
    });

    const req = httpMock.expectOne('/atendimento/listar');
    expect(req.request.method).toBe('POST');
    req.flush(mockAtendimentos);
  });
});