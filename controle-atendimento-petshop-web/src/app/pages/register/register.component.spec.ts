import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PetshopService } from '../../shared/services/petshop.service';
import { RegisterComponent } from './register.component';
import { base64ToFile } from '../../shared/utils/file';
import { Perfil } from '../../shared/enums/perfil';
import { HttpErrorResponse } from '@angular/common/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: jasmine.SpyObj<PetshopService>;

  let adminMock = {
    id: 1,
    nome: 'mateus',
    perfil: Perfil.ADMIN,
    senha: '123',
    dataCadastro: new Date(),
    cpf: 12345678910,
    foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
    contatos: [],
    enderecos: []
  };

  let errorMock = new HttpErrorResponse({
    status: 401,
    statusText: 'Unauthorized',
    error: {
      message: 'Não autorizado'
    }
  });

  beforeEach(async () => {
    service = jasmine.createSpyObj('PetshopService', [
      'cadastrarFuncionario',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent
      ],
      providers: [
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando envio de cadastro do admin', () => {
    // com foto
    component.cadastroForm.patchValue(adminMock);
    component.cadastroForm.get('cpf')?.patchValue(`${adminMock.cpf}`);

    service.cadastrarFuncionario.and.returnValue(of(adminMock));

    component.enviarCadastro(new SubmitEvent('submit'));

    expect(service.cadastrarFuncionario).toBeTruthy();
  });

  it('testando envio de cadastro com erro', () => {
    component.cadastroForm.patchValue(adminMock);
    component.cadastroForm.get('cpf')?.patchValue(`${adminMock.cpf}`);
    component.cadastroForm.get('foto')?.patchValue('');

    service.cadastrarFuncionario.and.returnValue(throwError(() => errorMock));
    component.enviarCadastro(new SubmitEvent('submit'));

    expect(service.cadastrarFuncionario).toBeTruthy();

    // enviando formulário vazio
    component.cadastroForm.reset();
    component.enviarCadastro(new SubmitEvent('submit'));

    expect(service.cadastrarFuncionario).toBeTruthy();
  });

  it('testando envio de foto no cadastro do usuário', () => {
    // com arquivos
    let dataTransfer = new DataTransfer();
    dataTransfer.items.add(base64ToFile(adminMock.foto));

    component.onImagePicked({ target: { files: dataTransfer.files } } as unknown as Event);

    // sem arquivos
    component.onImagePicked({ target: { files: new DataTransfer().files } } as unknown as Event);

    expect(component.cadastroForm).toBeTruthy();
  });
});