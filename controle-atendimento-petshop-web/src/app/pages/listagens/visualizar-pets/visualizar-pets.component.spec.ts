import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PetshopService } from '../../../shared/services/petshop.service';
import { VisualizarPetsComponent } from './visualizar-pets.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Perfil } from '../../../shared/enums/perfil';
import { Cliente, Contato, Endereco } from '../../../shared/interfaces/petshop.entities';

describe('VisualizarPetsComponent', () => {
  let component: VisualizarPetsComponent;
  let fixture: ComponentFixture<VisualizarPetsComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  let contatoMock = {
    id: 1,
    tag: '',
    tipo: 'email',
    valor: 'mateus@mateus.com'
  };

  let enderecoMock = {
    id: 1,
    logradouro: 'rua 2',
    cidade: 'sao paulo - sp',
    bairro: 'liberdade'
  };

  let clienteMock = {
    id: 1,
    nome: 'mateus',
    perfil: Perfil.CLIENTE,
    password: '123',
    dataCadastro: new Date(),
    cpf: '12345678910',
    contatos: Array.from({ length: 30 }).map((_, index) => ({ ...contatoMock, id: index + 1 })),
    enderecos: Array.from({ length: 30 }).map((_, index) => ({ ...enderecoMock, id: index + 1 }))
  };

  let petMock = {
    id: 1,
    nome: 'caramelo',
    dataNascimento: new Date(),
    cliente: clienteMock,
    raca: []
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
      'listarPets',
      'listarRacas',
      'listarClientes',
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

    service.listarPets.and.returnValue(of(Array.from({ length: 30 }).map((_, index) => ({ ...petMock, id: index + 1 }))));
    service.listarClientes.and.returnValue(of(Array.from({ length: 30 }).map((_, index) => ({ ...clienteMock, id: index + 1 }))));
    service.listarRacas.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando o método petAdicionado que recebe um pet do formulário para enviar/atualizar', () => {
    // com sucesso
    service.cadastrarPet.and.returnValue(of(petMock));

    component.petAdicionado(petMock);
    expect(service.cadastrarPet).toBeTruthy();

    // com erro
    component.clientes = [];
    service.cadastrarPet.and.returnValue(throwError(() => errorMock));

    component.petAdicionado(petMock);
    expect(service.cadastrarPet).toBeTruthy();
  });

  it('testando o método editarPet', () => {
    component.editarPet(petMock);

    expect(component.petSelecionadoEdicao).toBeTruthy();
  });

  it('testando o método excluirPet', () => {
    // com sucesso
    service.excluirPet.and.returnValue(of(true));
    component.pets = Array.from({ length: 30 }).map((_, index) => ({ ...petMock, id: index + 1 }));
    component.excluirPet(petMock);
    
    expect(service.excluirPet).toBeTruthy();
    
    // com erro
    service.excluirPet.and.returnValue(throwError(() => errorMock));
    component.excluirPet(petMock);

    expect(service.excluirPet).toBeTruthy();
  });

  it('simulando erro na listagem', () => {
    service.listarPets.and.returnValue(throwError(() => errorMock));
    service.listarRacas.and.returnValue(throwError(() => errorMock));
    service.listarClientes.and.returnValue(throwError(() => errorMock));

    component.buscarClientesPetsRacas();

    expect(service.listarPets).toBeTruthy();
    expect(service.listarRacas).toBeTruthy();
    expect(service.listarClientes).toBeTruthy();
  });

  it('testando a formatação de raças dos pets', () => {
    expect(component.formatarRacas(['vira lata', 'pit bull'].map((descricao, index) => ({ id: index + 1, descricao })))).toBe('vira lata, pit bull');
    expect(component.formatarRacas()).toBe('-');
  });

  it('testando métodos de atribuir cliente a lista de contatos e endereços', () => {
    let contatos = component.adicionarClienteContatos([contatoMock], clienteMock);
    let enderecos = component.adicionarClienteEnderecos([enderecoMock], clienteMock);

    expect(contatos.length).toEqual(1);
    expect(enderecos.length).toEqual(1);
  });
});