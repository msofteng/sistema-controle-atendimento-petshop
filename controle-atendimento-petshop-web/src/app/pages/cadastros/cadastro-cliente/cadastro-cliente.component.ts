import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Perfil } from '../../../shared/enums/perfil';
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
    console.log(contato);
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

      this.clienteAdicionado.emit(this.clienteForm.value);
      
      this.clienteForm.reset();
      this.fotoCliente.nativeElement.value = '';
    } else {
      this.clienteForm.markAllAsTouched();
    }
  }

  atualizarSenha(event: FocusEvent) {
    this.clienteForm.get('senha')?.setValue(this.clienteForm.get('cpf')?.value);
  }
}
