import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroAtendimentoComponent } from './cadastro-atendimento.component';

describe('CadastroAtendimentoComponent', () => {
  let component: CadastroAtendimentoComponent;
  let fixture: ComponentFixture<CadastroAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CadastroAtendimentoComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});