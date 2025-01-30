import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarAtendimentosComponent } from './visualizar-atendimentos.component';

describe('VisualizarAtendimentosComponent', () => {
  let component: VisualizarAtendimentosComponent;
  let fixture: ComponentFixture<VisualizarAtendimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VisualizarAtendimentosComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarAtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});