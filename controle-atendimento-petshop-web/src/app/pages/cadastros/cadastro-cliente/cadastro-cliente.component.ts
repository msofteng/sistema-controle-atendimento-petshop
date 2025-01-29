import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Perfil } from '../../../shared/enums/perfil';
import { TipoContato } from '../../../shared/enums/tipo-contato';
import { Cliente, Contato, Endereco } from '../../../shared/interfaces/petshop.entities';
import { base64ToFile, convertFileToBase64 } from '../../../shared/utils/util';
import { CadastroContatoComponent } from "../cadastro-contato/cadastro-contato.component";
import { CadastroEnderecoComponent } from "../cadastro-endereco/cadastro-endereco.component";

@Component({
  selector: 'app-cadastro-cliente',
  imports: [
    ReactiveFormsModule,
    CadastroContatoComponent,
    CadastroEnderecoComponent
  ],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.css'
})
export class CadastroClienteComponent {
  clienteForm: FormGroup = new FormGroup({
    id: new FormControl<number>(0, []),
    nome: new FormControl<string>('', [Validators.required]),
    perfil: new FormControl<Perfil>(Perfil.CLIENTE, [Validators.required]),
    senha: new FormControl<string>({ value: '', disabled: true }, [Validators.required]),
    cpf: new FormControl<string>('', [Validators.required]),
    foto: new FormControl<string>('', []),
    dataCadastro: new FormControl<Date>(new Date(), []),
    contatos: new FormArray([], []),
    enderecos: new FormArray([], [])
  });

  @Input()
  cliente?: Cliente;

  @Output()
  clienteAdicionado: EventEmitter<Cliente> = new EventEmitter<Cliente>();

  @ViewChild('fotoCliente')
  private fotoCliente!: ElementRef<HTMLInputElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente'].previousValue !== changes['cliente'].currentValue && this.cliente) {
      this.clienteForm.patchValue(this.cliente);
      this.contatos.patchValue(this.cliente.contatos);

      if (this.cliente.foto) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(base64ToFile(this.cliente.foto));

        this.fotoCliente.nativeElement.files = dataTransfer.files;
      }
    }
  }

  onImagePicked(event: Event) {
    let files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      convertFileToBase64(files[0])
        .then(base64 => this.clienteForm.get('foto')?.setValue(base64))
        .catch(error => console.error('Erro ao converter arquivo para base64:', error));
    } else {
      this.clienteForm.get('foto')?.setValue('');
    }
  }

  adicionarEndereco(endereco: Endereco) {
    console.log(endereco);
  }

  adicionarContato(contato: Contato) {
    this.contatos.push(
      new FormGroup({
        id: new FormControl<number>(contato.id, []),
        valor: new FormControl<string>(contato.valor, [Validators.required]),
        tipo: new FormControl<TipoContato | string>(contato.tipo, [Validators.required]),
        tag: new FormControl<string>(contato.tag, [])
      })
    );
  }

  adicionarCliente(event: SubmitEvent) {
    if (this.clienteForm.valid) {
      if (!isNaN(this.clienteForm.get('cpf')?.value) && this.clienteForm.get('cpf')?.value.length === 11) {
        this.clienteForm.get('cpf')?.setValue(Number(this.clienteForm.value.cpf));
      }

      this.clienteForm.get('dataCadastro')?.setValue(this.clienteForm.get('dataCadastro')?.value.toISOString().split('T')[0]);

      if (!this.clienteForm.value.id) delete this.clienteForm.value.id;
      if (!this.clienteForm.value.foto) delete this.clienteForm.value.foto;
      if (!this.clienteForm.value.cpf) delete this.clienteForm.value.cpf;

      for (let i = 0; i < this.clienteForm.value.contatos.length; i++) {
        if (!this.clienteForm.value.contatos[i].id) delete this.clienteForm.value.contatos[i].id;
        if (!this.clienteForm.value.contatos[i].tag) delete this.clienteForm.value.contatos[i].tag;
      }

      this.clienteAdicionado.emit(this.clienteForm.value);

      this.limparForm();
    } else {
      this.clienteForm.markAllAsTouched();
    }
  }

  limparForm() {
    this.clienteForm.get('id')?.setValue(0);
    this.clienteForm.get('nome')?.setValue('');
    this.clienteForm.get('perfil')?.setValue(Perfil.CLIENTE);
    this.clienteForm.get('senha')?.setValue('');
    this.clienteForm.get('cpf')?.setValue('');
    this.clienteForm.get('foto')?.setValue('');
    this.clienteForm.get('dataCadastro')?.setValue(new Date());
    this.contatos.clear();

    this.clienteForm.markAsUntouched();

    this.fotoCliente.nativeElement.value = '';
  }

  atualizarSenha(event: FocusEvent) {
    this.clienteForm.get('senha')?.setValue(this.clienteForm.get('cpf')?.value);
  }

  get contatos(): FormArray {
    return this.clienteForm.get('contatos') as FormArray;
  }

  removerContato(event: MouseEvent, index: number) {
    event.preventDefault();
    event.stopPropagation();

    if (index !== -1) {
      this.contatos.removeAt(index);
    }
  }
}
