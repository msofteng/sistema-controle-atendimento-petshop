import { Component, inject } from '@angular/core';
import { PetshopService } from '../../../shared/services/petshop.service';

@Component({
  selector: 'app-visualizar-clientes',
  imports: [],
  templateUrl: './visualizar-clientes.component.html',
  styleUrl: './visualizar-clientes.component.css'
})
export class VisualizarClientesComponent {
  service: PetshopService = inject(PetshopService);
}
