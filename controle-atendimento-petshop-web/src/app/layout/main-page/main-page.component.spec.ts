import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot', 'params']);

    await TestBed.configureTestingModule({
      imports: [
        MainPageComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});