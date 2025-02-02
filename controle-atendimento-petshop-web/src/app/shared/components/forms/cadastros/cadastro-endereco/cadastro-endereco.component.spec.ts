import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroEnderecoComponent } from './cadastro-endereco.component';
import { SimpleChange } from '@angular/core';

describe('CadastroEnderecoComponent', () => {
  let component: CadastroEnderecoComponent;
  let fixture: ComponentFixture<CadastroEnderecoComponent>;

  let enderecoMock = {
    id: 1,
    logradouro: 'rua 2',
    cidade: 'sao paulo - sp',
    bairro: 'liberdade'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CadastroEnderecoComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando formulário quando recebe um endereço para ser atualizado', () => {
    component.endereco = enderecoMock;
    component.ngOnChanges({
      'endereco': new SimpleChange(undefined, enderecoMock, true)
    });
    expect(component.endereco).toBeTruthy();
  });

  it('testando adição de endereço', () => {
    // com formulário preenchido (atualização)
    component.enderecoForm.patchValue(enderecoMock);
    component.adicionarEndereco(new SubmitEvent('submit'));

    expect(component.enderecoForm).toBeTruthy();

    // com formulário preenchido (cadastro)
    component.enderecoForm.patchValue({
      ...enderecoMock,
      id: 0
    })
    component.adicionarEndereco(new SubmitEvent('submit'));

    expect(component.enderecoForm).toBeTruthy();

    // com formulário vazio
    component.enderecoForm.reset();

    component.adicionarEndereco(new SubmitEvent('submit'));

    expect(component.enderecoForm).toBeTruthy();
  });
});