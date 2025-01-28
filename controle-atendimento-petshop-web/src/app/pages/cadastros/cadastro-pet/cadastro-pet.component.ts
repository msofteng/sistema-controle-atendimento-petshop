import { Component } from '@angular/core';
import { CadastroRacaComponent } from "../cadastro-raca/cadastro-raca.component";

@Component({
  selector: 'app-cadastro-pet',
  imports: [
    CadastroRacaComponent
  ],
  templateUrl: './cadastro-pet.component.html',
  styleUrl: './cadastro-pet.component.css'
})
export class CadastroPetComponent {

}
