import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot', 'params']);

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando abertura do menu de opções do usuário logado', () => {
    // abrindo menu
    component.toggleMenu(new MouseEvent('click'));
    expect(component.showMenu).toBeTrue();

    // fechando menu
    let menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-container');
    document.body.appendChild(menuContainer);

    component.onClickOutside(new MouseEvent('click'));
    expect(component.showMenu).toBeFalse();
  });
});