import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroRacaComponent } from './cadastro-raca.component';
import { SimpleChange } from '@angular/core';

describe('CadastroRacaComponent', () => {
  let component: CadastroRacaComponent;
  let fixture: ComponentFixture<CadastroRacaComponent>;

  let racaMock = {
    id: 1,
    descricao: 'vira-lata'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CadastroRacaComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroRacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando formulário quando recebe uma raça animal para ser atualizada', () => {
    component.raca = racaMock;
    component.ngOnChanges({
      'raca': new SimpleChange(undefined, racaMock, true)
    });
    expect(component.raca).toBeTruthy();
  });

  it('testando adição de raça animal', () => {
    // com formulário preenchido (atualização)
    component.racaForm.patchValue(racaMock);
    component.adicionarRaca(new SubmitEvent('submit'));

    expect(component.racaForm).toBeTruthy();

    // com formulário preenchido (cadastro)
    component.racaForm.patchValue({
      id: 0,
      descricao: 'vira lata'
    })
    component.adicionarRaca(new SubmitEvent('submit'));

    expect(component.racaForm).toBeTruthy();

    // com formulário vazio
    component.racaForm.reset();

    component.adicionarRaca(new SubmitEvent('submit'));

    expect(component.racaForm).toBeTruthy();
  });
});