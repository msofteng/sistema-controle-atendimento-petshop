import { Component, inject } from '@angular/core';
import { PetshopService } from '../../../shared/services/petshop.service';

@Component({
  selector: 'app-visualizar-funcionarios',
  imports: [],
  templateUrl: './visualizar-funcionarios.component.html',
  styleUrl: './visualizar-funcionarios.component.css'
})
export class VisualizarFuncionariosComponent {
  service: PetshopService = inject(PetshopService);
}
