import { HttpErrorResponse } from '@angular/common/http';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Perfil } from '../../../../enums/perfil';
import { TipoContato } from '../../../../enums/tipo-contato';
import { PetshopService } from '../../../../services/petshop.service';
import { changePerfil, changeTipoContato } from '../../../../utils/change-enum';
import { base64ToFile } from '../../../../utils/file';
import { CadastroClienteComponent } from './cadastro-cliente.component';

describe('CadastroClienteComponent', () => {
  let component: CadastroClienteComponent;
  let fixture: ComponentFixture<CadastroClienteComponent>;
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
    foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
    contatos: Array.from({ length: 30 }).map((_, index) => ({ ...contatoMock, id: index + 1 })),
    enderecos: Array.from({ length: 30 }).map((_, index) => ({ ...enderecoMock, id: index + 1 }))
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
      'excluirContato',
      'excluirEndereco'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CadastroClienteComponent
      ],
      providers: [
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroClienteComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando formulário quando recebe um cliente para ser atualizado', () => {
    component.cliente = clienteMock;
    component.ngOnChanges({
      'cliente': new SimpleChange(undefined, clienteMock, true)
    });

    expect(component.cliente).toBeTruthy();
  });

  it('testando envio de foto no cadastro do cliente', () => {
    // com arquivos
    let dataTransfer = new DataTransfer();
    dataTransfer.items.add(base64ToFile(clienteMock.foto));

    component.onImagePicked({ target: { files: dataTransfer.files } } as unknown as Event);

    // sem arquivos
    component.onImagePicked({ target: { files: new DataTransfer().files } } as unknown as Event);

    expect(component.clienteForm).toBeTruthy();
  });

  it('testando formulário para adicionar cliente', () => {
    // atualização
    component.clienteForm.patchValue(clienteMock);
    component.clienteForm.get('cpf')?.setValue(clienteMock.cpf.toString());

    component.adicionarCliente(new SubmitEvent('submit'));

    expect(component.clienteForm).toBeTruthy();
    
    // sem id
    component.clienteForm.patchValue({...clienteMock, id: 0});
    component.adicionarCliente(new SubmitEvent('submit'));

    // sem foto
    component.clienteForm.patchValue({...clienteMock, foto: ''});
    component.adicionarCliente(new SubmitEvent('submit'));

    // sem cpf
    component.clienteForm.patchValue({...clienteMock, cpf: 0});
    component.adicionarCliente(new SubmitEvent('submit'));

    // com formulário vazio
    component.clienteForm.reset();
    component.adicionarCliente(new SubmitEvent('submit'));

    expect(component.clienteForm).toBeTruthy();
  });

  it('atualizar senha a partir do número do cpf', () => {
    component.clienteForm.get('cpf')?.setValue(clienteMock.cpf);
    component.atualizarSenha(new FocusEvent('input'));
    expect(component.clienteForm.get('senha')?.value).toEqual(component.clienteForm.get('cpf')?.value);
  });

  it('testando a remoção de contato', () => {
    // sucesso
    service.excluirContato.and.returnValue(of(true));
    component.adicionarContato(contatoMock);
    component.removerContato(new MouseEvent('click'), 0);
    expect(component.contatos.length).toEqual(0);

    // erro
    service.excluirContato.and.returnValue(throwError(() => errorMock));
    component.adicionarContato(contatoMock);
    component.removerContato(new MouseEvent('click'), 0);
    expect(component.contatos.length).toEqual(1);
  });

  it('testando a remoção de endereço', () => {
    // sucesso
    service.excluirEndereco.and.returnValue(of(true));
    component.adicionarEndereco(enderecoMock);
    component.removerEndereco(new MouseEvent('click'), 0);
    expect(component.enderecos.length).toEqual(0);

    // erro
    service.excluirEndereco.and.returnValue(throwError(() => errorMock));
    component.adicionarEndereco(enderecoMock);
    component.removerEndereco(new MouseEvent('click'), 0);
    expect(component.enderecos.length).toEqual(1);
  });

  it('testando a remoção de atributos opcionais do contato', () => {
    // com id
    expect(component.removerAtributosOpcionaisContato({
      ...contatoMock,
      id: 1,
      tag: 'teste'
    })).toEqual({
      id: contatoMock.id,
      tag: 'teste',
      tipo: contatoMock.tipo,
      valor: contatoMock.valor
    });

    // sem id
    expect(component.removerAtributosOpcionaisContato({
      ...contatoMock,
      id: 0,
      tag: 'teste'
    })).toEqual({
      id: undefined,
      tag: 'teste',
      tipo: contatoMock.tipo,
      valor: contatoMock.valor
    });

    // sem tag
    expect(component.removerAtributosOpcionaisContato({
      ...contatoMock,
      id: 0,
      tag: ''
    })).toEqual({
      id: undefined,
      tag: undefined,
      tipo: contatoMock.tipo,
      valor: contatoMock.valor
    });
  });

  it('testando a remoção de atributos opcionais do endereço', () => {
    expect(component.removerAtributosOpcionaisEndereco({
      ...enderecoMock,
      id: 1,
      complemento: 'teste',
      tag: 'teste'
    })).toEqual({
      id: enderecoMock.id,
      complemento: 'teste',
      tag: 'teste',
      logradouro: enderecoMock.logradouro,
      cidade: enderecoMock.cidade,
      bairro: enderecoMock.bairro
    });

    // sem id
    expect(component.removerAtributosOpcionaisEndereco({
      ...enderecoMock,
      id: 0,
      complemento: 'teste',
      tag: 'teste'
    })).toEqual({
      id: undefined,
      complemento: 'teste',
      tag: 'teste',
      logradouro: enderecoMock.logradouro,
      cidade: enderecoMock.cidade,
      bairro: enderecoMock.bairro
    });

    // sem complemento
    expect(component.removerAtributosOpcionaisEndereco({
      ...enderecoMock,
      id: 0,
      complemento: '',
      tag: 'teste'
    })).toEqual({
      id: undefined,
      complemento: undefined,
      tag: 'teste',
      logradouro: enderecoMock.logradouro,
      cidade: enderecoMock.cidade,
      bairro: enderecoMock.bairro
    });

    // sem tag
    expect(component.removerAtributosOpcionaisEndereco({
      ...enderecoMock,
      id: 0,
      complemento: '',
      tag: ''
    })).toEqual({
      id: undefined,
      complemento: undefined,
      tag: undefined,
      logradouro: enderecoMock.logradouro,
      cidade: enderecoMock.cidade,
      bairro: enderecoMock.bairro
    });
  });

  it('deve retornar Perfil.CLIENTE quando o perfil for "cliente"', () => {
    const result = changePerfil('cliente');
    expect(result).toBe(Perfil.CLIENTE);
  });

  it('deve retornar Perfil.ADMIN quando o perfil for "administrador"', () => {
    const result = changePerfil('administrador');
    expect(result).toBe(Perfil.ADMIN);
  });

  it('deve retornar Perfil.CLIENTE por padrão para valores desconhecidos', () => {
    const result = changePerfil('desconhecido');
    expect(result).toBe(Perfil.CLIENTE);
  });

  it('deve retornar TipoContato.EMAIL quando o tipo for "e-mail"', () => {
    const result = changeTipoContato('e-mail');
    expect(result).toBe(TipoContato.EMAIL);
  });

  it('deve retornar TipoContato.TELEFONE quando o tipo for "telefone"', () => {
    const result = changeTipoContato('telefone');
    expect(result).toBe(TipoContato.TELEFONE);
  });

  it('deve retornar TipoContato.EMAIL por padrão para valores desconhecidos', () => {
    const result = changeTipoContato('outro');
    expect(result).toBe(TipoContato.EMAIL);
  });
});