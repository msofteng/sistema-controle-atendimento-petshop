import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarRacasComponent } from './visualizar-racas.component';

describe('VisualizarRacasComponent', () => {
  let component: VisualizarRacasComponent;
  let fixture: ComponentFixture<VisualizarRacasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VisualizarRacasComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarRacasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});