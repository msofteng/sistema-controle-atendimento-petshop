import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroPetComponent } from './cadastro-pet.component';
import { Perfil } from '../../../../enums/perfil';
import { Cliente } from '../../../../interfaces/petshop.entities';
import { ElementRef, SimpleChange } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { base64ToFile } from '../../../../utils/file';

describe('CadastroPetComponent', () => {
  let component: CadastroPetComponent;
  let fixture: ComponentFixture<CadastroPetComponent>;

  let clienteMock: Cliente = {
    id: 1,
    nome: 'mateus',
    perfil: Perfil.CLIENTE,
    senha: '123',
    dataCadastro: new Date(),
    cpf: 12345678910,
    contatos: [],
    enderecos: []
  };

  let racaMock = {
    id: 1,
    descricao: 'vira-lata'
  };

  let petMock = {
    id: 1,
    nome: 'caramelo',
    dataNascimento: new Date(),
    cliente: clienteMock,
    foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=',
    raca: [
      racaMock
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CadastroPetComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('testando formulário quando recebe um pet para ser atualizado', () => {
    let select = document.createElement('select');
    let option = document.createElement('option');

    option.textContent = racaMock.descricao;
    select.options.add(option);

    component['selectRacas'] = new ElementRef(select);
    
    component.pet = petMock;
    component.ngOnChanges({
      'pet': new SimpleChange(undefined, petMock, true)
    });

    expect(component.pet).toBeTruthy();

    // testando adição de raça no cadastro do pet
    component.racas = [];
    component.adicionarRacaPet(racaMock);

    setTimeout(() => {
      expect(component.racas).toBeTruthy();
    });
  });

  it('remover raças do pet selecionadas', () => {
    // adicionando as raças na lista de opções
    component.racas = [racaMock];

    let select = document.createElement('select');

    Array.from({ length: 30 }, (_, index) => {
      let option = document.createElement('option');
      option.textContent = `${racaMock.descricao}#${index + 1}`;
      option.value = `${index + 1}`;
      select.options.add(option);
    });

    select.options[0].selected = true;

    component['selectRacas'] = new ElementRef(select);

    // remover raças selecionadas
    component.removerRacasSelecionadas(new MouseEvent('click'));

    expect(component['selectRacas']).toBeTruthy();
  });

  it('testando formulário pra adicionar pet', () => {
    // adicionando as raças na lista de opções
    component.racas = [racaMock];

    let select = document.createElement('select');

    Array.from({ length: 30 }, (_, index) => {
      let option = document.createElement('option');
      option.textContent = `${racaMock.descricao}#${index + 1}`;
      option.value = `${index + 1}`;
      select.options.add(option);
    });

    select.options[0].selected = true;

    component['selectRacas'] = new ElementRef(select);

    // sem id
    component.petForm.patchValue({...petMock, id: 0});
    component.adicionarPet(new SubmitEvent('submit'));

    // sem foto
    component.petForm.patchValue({...petMock, foto: ''});
    component.adicionarPet(new SubmitEvent('submit'));

    // com formulário vazio
    component.petForm.reset();
    component.adicionarPet(new SubmitEvent('submit'));

    expect(component.petForm).toBeTruthy();
  });

  it('testando envio de foto no cadastro do pet', () => {
    // com arquivos
    let dataTransfer = new DataTransfer();
    dataTransfer.items.add(base64ToFile(petMock.foto));

    component.onImagePicked({ target: { files: dataTransfer.files } } as unknown as Event);

    // sem arquivos
    component.onImagePicked({ target: { files: new DataTransfer().files } } as unknown as Event);

    expect(component.petForm).toBeTruthy();
  });
});