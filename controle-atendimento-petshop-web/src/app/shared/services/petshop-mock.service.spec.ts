import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { Perfil } from '../enums/perfil';
import { PetshopMockService } from './petshop-mock.service';

describe('PetshopMockService', () => {
  let service: PetshopMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetshopMockService);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('testando cadastro de funcionário', async () => {
    const funcionario = await firstValueFrom(service.cadastrarFuncionario({
      id: 0,
      nome: 'mateus',
      perfil: Perfil.ADMIN,
      password: '123'
    }));

    expect(funcionario.nome).toBe('mateus');
  });

  it('testando cadastro de cliente', (done) => {
    service.cadastrarCliente({
      id: 0,
      nome: 'lucas',
      perfil: Perfil.CLIENTE,
      password: '123',
      dataCadastro: new Date(),
      contatos: [],
      enderecos: []
    }).subscribe(cliente => {
      expect(cliente.nome).toBe('lucas');
      done();
    });
  });

  it('testando cadastro de atendimento', (done) => {
    service.cadastrarAtendimento({
      id: 0,
      descricao: 'teste',
      valor: 0,
      data: '',
      pets: [],
    }).subscribe(atendimento => {
      expect(atendimento.descricao).toBe('teste');
      done();
    });
  });

  it('testando cadastro de pet', (done) => {
    service.cadastrarPet({
      id: 0,
      nome: 'lili',
      dataNascimento: new Date(),
      raca: [],
      cliente: {
        id: 0,
        nome: '',
        perfil: '',
        password: '',
        dataCadastro: '',
        contatos: [],
        enderecos: [],
      }
    }).subscribe(pet => {
      expect(pet.nome).toBe('lili');
      done();
    });
  });

  it('testando cadastro de raça', (done) => {
    service.cadastrarRaca({
      id: 0,
      descricao: 'vira-lata',
    }).subscribe(raca => {
      expect(raca.descricao).toBe('vira-lata');
      done();
    });
  });

  it('testando exclusão de funcionário', (done) => {
    service.excluirFuncionario({
      id: 0,
      nome: 'mateus',
      perfil: Perfil.ADMIN,
      password: '123'
    }).subscribe(data => {
      expect(data).toBe(true);
      done();
    });
  });

  it('testando exclusão de cliente', (done) => {
    service.excluirCliente({
      id: 0,
      nome: 'lucas',
      perfil: Perfil.CLIENTE,
      password: '123',
      dataCadastro: new Date(),
      contatos: [],
      enderecos: []
    }).subscribe(data => {
      expect(data).toBe(true);
      done();
    });
  });

  it('testando exclusão de atendimento', (done) => {
    service.excluirAtendimento({
      id: 0,
      descricao: 'teste',
      valor: 0,
      data: '',
      pets: [],
    }).subscribe(data => {
      expect(data).toBe(true);
      done();
    });
  });

  it('testando exclusão de pet', (done) => {
    service.excluirPet({
      id: 0,
      nome: '',
      dataNascimento: '',
      cliente: {
        id: 0,
        nome: '',
        perfil: '',
        password: '',
        dataCadastro: new Date(),
        contatos: [],
        enderecos: [],
      },
      raca: []
    }).subscribe(data => {
      expect(data).toBe(true);
      done();
    });
  });

  it('testando exclusão de raça', (done) => {
    service.excluirRaca({
      id: 0,
      descricao: 'vira-lata',
    }).subscribe(data => {
      expect(data).toBe(true);
      done();
    });
  });

  it('testando login', (done) => {
    service.login({
      nomeCpf: 'mateus',
      password: '123'
    }).subscribe(data => {
      expect(data.nome).toBe('mateus');
      done();
    });
  });

  it('testando listagem de clientes', (done) => {
    service.listarClientes({}).subscribe(data => {
      expect(data.length).toEqual(0);
      done();
    });
  });

  it('testando listagem de atendimentos', (done) => {
    service.listarAtendimentos({}).subscribe(data => {
      expect(data.length).toEqual(1);
      done();
    });
  });

  it('testando listagem de pets', (done) => {
    service.listarPets({}).subscribe(data => {
      expect(data.length).toEqual(1);
      done();
    });
  });

  it('testando listagem de raças dos animais', (done) => {
    service.listarRacas({}).subscribe(data => {
      expect(data.length).toEqual(1);
      done();
    });
  });
});