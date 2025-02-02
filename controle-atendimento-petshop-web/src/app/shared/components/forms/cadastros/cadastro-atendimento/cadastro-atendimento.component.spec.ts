import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroAtendimentoComponent } from './cadastro-atendimento.component';
import { Perfil } from '../../../../enums/perfil';
import { Cliente, Atendimento } from '../../../../interfaces/petshop.entities';
import { ElementRef, SimpleChange } from '@angular/core';

describe('CadastroAtendimentoComponent', () => {
  let component: CadastroAtendimentoComponent;
  let fixture: ComponentFixture<CadastroAtendimentoComponent>;

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

  let petMock = {
    id: 1,
    nome: 'caramelo',
    dataNascimento: new Date(),
    cliente: clienteMock,
    raca: [
      {
        id: 1,
        descricao: 'vira lata'
      },
      {
        id: 0,
        descricao: 'rotivale'
      }
    ]
  };

  let atendimentoMock = {
    id: 1,
    descricao: 'teste',
    valor: 200,
    data: new Date(),
    pets: Array.from({ length: 30 }).map((_, index) => ({ ...petMock, id: index + 1 }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CadastroAtendimentoComponent
      ],
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando formulário quando recebe um atendimento para ser atualizado', (done) => {
    component.atendimento = atendimentoMock;
    component.clientes = [clienteMock];

    // criando a lista de pets selecionados
    let select = document.createElement('select');
    let option = document.createElement('option');

    option.textContent = petMock.nome;
    option.value = petMock.id.toString();
    option.selected = true;
    
    select.options.add(option);

    component['selectPets'] = new ElementRef(select);

    component.ngOnChanges({
      'atendimento': new SimpleChange(undefined, atendimentoMock, true)
    });

    expect(component.atendimento).toBeTruthy();

    setTimeout(() => {
      done();
    }, 3000);
  });

  it('teste formulário para adicionar atendimento', () => {
    component.clientes = [clienteMock];
    component.pets = [{
      ...petMock,
      raca: [
        {
          id: 0,
          descricao: 'pit bull'
        }
      ]
    }];
    component.racas = [...petMock.raca];

    // criando a lista de pets selecionados
    let select = document.createElement('select');

    let option = document.createElement('option');
    option.textContent = petMock.nome;
    option.value = petMock.id.toString();
    option.selected = true;
    
    select.options.add(option);

    component['selectPets'] = new ElementRef(select);
    
    // formulário preenchido
    component.atendimentoForm.patchValue(atendimentoMock);
    component.atendimentoForm.get('cliente')?.setValue(clienteMock.nome);
    component.atendimentoForm.get('id')?.setValue(0);
    component.adicionarAtendimento(new SubmitEvent('submit'));

    expect(component.atendimentoForm).toBeTruthy();

    // formulário vazio
    component.atendimentoForm.reset();
    component.adicionarAtendimento(new SubmitEvent('submit'));

    expect(component.atendimentoForm).toBeTruthy();

    // adicionando um pet na lista
    component.pets = [];
    component.adicionarPet(petMock);

    expect(component.pets.length).toEqual(1);
  });

  it('testando adição de cliente na lista de selecionar clientes', () => {
    component.clientes = [clienteMock];

    component.adicionarCliente(clienteMock);

    expect(component.clientes.length).toEqual(2);
  });
});