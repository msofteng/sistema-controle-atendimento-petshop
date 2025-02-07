import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Perfil } from '../../../../enums/perfil';
import { TipoContato } from '../../../../enums/tipo-contato';
import { Usuario, Contato, Endereco } from '../../../../interfaces/petshop.entities';
import { PetshopService } from '../../../../services/petshop.service';
import { base64ToFile, convertFileToBase64 } from '../../../../utils/file';
import { CadastroContatoComponent } from "../cadastro-contato/cadastro-contato.component";
import { CadastroEnderecoComponent } from "../cadastro-endereco/cadastro-endereco.component";
import HttpErrorResponse from '../../../../../core/errors/http-error-response';
import { ResponseError } from '../../../../interfaces/response';
import { ToastrService } from 'ngx-toastr';

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
    perfil: new FormControl<Perfil>(Perfil.CLIENTE, []),
    password: new FormControl<string>('', []),
    cpf: new FormControl<string>('', []),
    foto: new FormControl<string>('', []),
    dataCadastro: new FormControl<string>(new Date().toISOString().split('T')[0], []),
    contatos: new FormArray([], []),
    enderecos: new FormArray([], [])
  });

  service: PetshopService = inject(PetshopService);
  toastr: ToastrService = inject(ToastrService);

  @Input()
  cliente?: Usuario;

  @Output()
  clienteAdicionado: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  @ViewChild('fotoCliente')
  private fotoCliente!: ElementRef<HTMLInputElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente'].previousValue !== changes['cliente'].currentValue && this.cliente) {
      this.cliente.password = '';
      this.clienteForm.patchValue(this.cliente);

      if (this.cliente.contatos && this.cliente.contatos.length > 0)
        this.cliente.contatos.forEach(contato => this.adicionarContato(contato));

      if (this.cliente.enderecos && this.cliente.enderecos.length > 0)
        this.cliente.enderecos.forEach(endereco => this.adicionarEndereco(endereco));

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
    } else {
      this.clienteForm.get('foto')?.setValue('');
    }
  }

  adicionarEndereco(endereco: Endereco) {
    this.enderecos.push(
      new FormGroup({
        id: new FormControl<number>(endereco.id, []),
        logradouro: new FormControl<string>(endereco.logradouro, [Validators.required]),
        cidade: new FormControl<string>(endereco.cidade, [Validators.required]),
        bairro: new FormControl<string>(endereco.bairro, [Validators.required]),
        complemento: new FormControl<string>(endereco.complemento ?? '', []),
        tag: new FormControl<string>(endereco.tag ?? '', [])
      })
    );
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
      if (!this.clienteForm.value.id)
        delete this.clienteForm.value.id;
      if (!this.clienteForm.value.foto)
        delete this.clienteForm.value.foto;
      if (!this.clienteForm.value.cpf)
        delete this.clienteForm.value.cpf;

      this.clienteAdicionado.emit({
        ...this.clienteForm.value,
        contatos: this.clienteForm.value.contatos.map(this.removerAtributosOpcionaisContato),
        enderecos: this.clienteForm.value.enderecos.map(this.removerAtributosOpcionaisEndereco)
      });

      this.contatos.clear();
      this.enderecos.clear();
      this.clienteForm.reset();

      this.clienteForm.get('perfil')?.setValue(Perfil.CLIENTE);
      this.clienteForm.get('dataCadastro')?.setValue(new Date().toISOString().split('T')[0]);
      this.fotoCliente.nativeElement.value = '';
    } else {
      this.clienteForm.markAllAsTouched();
    }
  }

  atualizarSenha(event: FocusEvent) {
    this.clienteForm.get('password')?.setValue(this.clienteForm.get('cpf')?.value);
  }

  get contatos(): FormArray {
    return this.clienteForm.get('contatos') as FormArray;
  }

  get enderecos(): FormArray {
    return this.clienteForm.get('enderecos') as FormArray;
  }

  removerContato(event: MouseEvent, index: number) {
    event.preventDefault();
    event.stopPropagation();

    this.service.excluirContato(this.contatos.at(index).value).subscribe({
      next: () => this.contatos.removeAt(index),
      error: (err: HttpErrorResponse<ResponseError>) => this.mostrarErro(err)
    });
  }

  removerEndereco(event: MouseEvent, index: number) {
    event.preventDefault();
    event.stopPropagation();

    this.service.excluirEndereco(this.enderecos.at(index).value).subscribe({
      next: () => this.enderecos.removeAt(index),
      error: (err: HttpErrorResponse<ResponseError>) => this.mostrarErro(err)
    });
  }

  removerAtributosOpcionaisContato(contato: Contato) {
    return {
      ...contato,
      id: contato.id ? contato.id : undefined,
      tag: contato.tag ? contato.tag : undefined
    };
  }

  removerAtributosOpcionaisEndereco(endereco: Endereco) {
    return {
      ...endereco,
      id: endereco.id ? endereco.id : undefined,
      complemento: endereco.complemento ? endereco.complemento : undefined,
      tag: endereco.tag ? endereco.tag : undefined
    };
  }

  mostrarErro(err: HttpErrorResponse<ResponseError>) {
    this.toastr.error(`
      <details>
        <summary>Erro: ${err.error.message}</summary>
        ${err.error.detail}
      </details>
    `);
  }
}