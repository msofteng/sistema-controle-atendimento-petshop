import { Component } from '@angular/core';
import { CadastroContatoComponent } from "../cadastro-contato/cadastro-contato.component";
import { CadastroEnderecoComponent } from "../cadastro-endereco/cadastro-endereco.component";

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

}
