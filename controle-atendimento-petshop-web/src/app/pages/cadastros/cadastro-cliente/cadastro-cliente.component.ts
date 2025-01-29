import { Component } from '@angular/core';
import { CadastroContatoComponent } from "../cadastro-contato/cadastro-contato.component";
import { CadastroEnderecoComponent } from "../cadastro-endereco/cadastro-endereco.component";
import { convertFileToBase64 } from '../../../shared/utils/util';

@Component({
  selector: 'app-cadastro-cliente',
  imports: [
    CadastroContatoComponent,
    CadastroEnderecoComponent
],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.css'
})
export class CadastroClienteComponent {
  onImagePicked(event: Event) {
    // let files = (event.target as HTMLInputElement).files;

    // if (files && files.length > 0) {
    //   convertFileToBase64(files[0])
    //     .then(base64 => this.clienteForm.get('foto')?.setValue(base64))
    //     .catch(error => console.error('Erro ao converter arquivo para base64:', error));
    // } else {
    //   this.clienteForm.get('foto')?.setValue('');
    // }
  }
}
