import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarPetsComponent } from './visualizar-pets.component';

describe('VisualizarPetsComponent', () => {
  let component: VisualizarPetsComponent;
  let fixture: ComponentFixture<VisualizarPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VisualizarPetsComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});