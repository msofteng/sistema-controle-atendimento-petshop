import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Perfil } from '../../shared/enums/perfil';
import { PetshopService } from '../../shared/services/petshop.service';
import { base64ToFile } from '../../shared/utils/file';
import { ContaComponent } from './conta.component';

import HttpErrorResponse from '../../core/errors/http-error-response';

describe('ContaComponent', () => {
  let component: ContaComponent;
  let fixture: ComponentFixture<ContaComponent>;
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

  let errorMock = new HttpErrorResponse({
    status: 401,
    statusText: 'Unauthorized',
    error: {
      message: 'Não autorizado'
    }
  });

  beforeEach(async () => {
    service = jasmine.createSpyObj('PetshopService', [
      // 'login',
      'cadastrarFuncionario'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ContaComponent
      ],
      providers: [
        {
          provide: PetshopService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContaComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(PetshopService) as jasmine.SpyObj<PetshopService>;

    // service.login.and.returnValue(of(usuario));

    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando envio de atualização do usuário logado', () => {
    component.atualizacaoForm.patchValue(adminMock);
    component.atualizacaoForm.get('cpf')?.patchValue(`${adminMock.cpf}`);
    component.atualizacaoForm.get('foto')?.patchValue('');

    service.cadastrarFuncionario.and.returnValue(of(adminMock));
    component.atualizaCadastro(new SubmitEvent('submit'));

    expect(component.atualizacaoForm).toBeTruthy();

    // tratando cadastro com erro
    service.cadastrarFuncionario.and.returnValue(throwError(() => errorMock));
    component.atualizaCadastro(new SubmitEvent('submit'));

    // enviando formulário vazio
    component.atualizacaoForm.reset();
    component.atualizaCadastro(new SubmitEvent('submit'));
  });

  it('testando envio de foto na atualização do usuário', () => {
    // com arquivos
    let dataTransfer = new DataTransfer();
    dataTransfer.items.add(base64ToFile(adminMock.foto));

    component.onImagePicked({ target: { files: dataTransfer.files } } as unknown as Event);

    // sem arquivos
    component.onImagePicked({ target: { files: new DataTransfer().files } } as unknown as Event);

    expect(component.atualizacaoForm).toBeTruthy();
  });
});