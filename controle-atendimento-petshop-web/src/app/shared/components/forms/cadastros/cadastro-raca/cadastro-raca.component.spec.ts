import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroRacaComponent } from './cadastro-raca.component';

describe('CadastroRacaComponent', () => {
  let component: CadastroRacaComponent;
  let fixture: ComponentFixture<CadastroRacaComponent>;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});