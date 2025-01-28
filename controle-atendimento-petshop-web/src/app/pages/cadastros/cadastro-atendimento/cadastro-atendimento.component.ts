import { Component } from '@angular/core';
import { CadastroClienteComponent } from "../cadastro-cliente/cadastro-cliente.component";
import { CadastroPetComponent } from "../cadastro-pet/cadastro-pet.component";

@Component({
  selector: 'app-cadastro-atendimento',
  imports: [
    CadastroClienteComponent,
    CadastroPetComponent
],
  templateUrl: './cadastro-atendimento.component.html',
  styleUrl: './cadastro-atendimento.component.css'
})
export class CadastroAtendimentoComponent {

}
