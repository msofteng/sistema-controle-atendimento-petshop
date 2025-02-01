import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroClienteComponent } from './cadastro-cliente.component';
import { PetshopService } from '../../../../services/petshop.service';
import { of } from 'rxjs';

describe('CadastroClienteComponent', () => {
  let component: CadastroClienteComponent;
  let fixture: ComponentFixture<CadastroClienteComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj('PetshopService', [
      'excluirContato',
      'excluirEndereco'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CadastroClienteComponent
      ],
      providers: [
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroClienteComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;

    service.excluirContato.and.returnValue(of(true));
    service.excluirEndereco.and.returnValue(of(true));

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });
});