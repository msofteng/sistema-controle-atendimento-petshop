import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroContatoComponent } from './cadastro-contato.component';
import { SimpleChange } from '@angular/core';

describe('CadastroContatoComponent', () => {
  let component: CadastroContatoComponent;
  let fixture: ComponentFixture<CadastroContatoComponent>;

  let contatoMock = {
    id: 1,
    tag: '',
    tipo: 'email',
    valor: 'mateus@mateus.com'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CadastroContatoComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando formulário quando recebe um contato para ser atualizado', () => {
    component.contato = contatoMock;
    component.ngOnChanges({
      'contato': new SimpleChange(undefined, contatoMock, true)
    });
    expect(component.contato).toBeTruthy();
  });

  it('testando adição de contato', () => {
    // com formulário preenchido (atualização)
    component.contatoForm.patchValue(contatoMock);
    component.adicionarContato(new SubmitEvent('submit'));

    expect(component.contatoForm).toBeTruthy();

    // com formulário preenchido (cadastro)
    component.contatoForm.patchValue({
      ...contatoMock,
      id: 0
    })
    component.adicionarContato(new SubmitEvent('submit'));

    expect(component.contatoForm).toBeTruthy();

    // com formulário vazio
    component.contatoForm.reset();

    component.adicionarContato(new SubmitEvent('submit'));

    expect(component.contatoForm).toBeTruthy();
  });
});