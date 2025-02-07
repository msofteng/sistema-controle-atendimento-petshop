import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './header.component';
import { PetshopService } from '../../../services/petshop.service';
import { Perfil } from '../../../enums/perfil';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let service: jasmine.SpyObj<PetshopService>;

  let adminMock = {
    id: 1,
    nome: 'mateus',
    perfil: Perfil.ADMIN,
    password: '123',
    dataCadastro: new Date(),
    cpf: '12345678910',
    foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
    contatos: [],
    enderecos: []
  };

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot', 'params']);
    service = jasmine.createSpyObj('PetshopService', [
      'getUsuario',
      'setUsuario'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        },
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    
    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;
    service.getUsuario.and.returnValue(of(adminMock));

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

  it('testando o método sair (desautenticar)', () => {
    component.sair();
    expect(component.cookieService.check('token')).toBeFalse();
  });
});