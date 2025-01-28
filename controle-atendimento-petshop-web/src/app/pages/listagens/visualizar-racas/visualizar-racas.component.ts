import { Component, inject } from '@angular/core';
import { PetshopService } from '../../../shared/services/petshop.service';

@Component({
  selector: 'app-visualizar-racas',
  imports: [],
  templateUrl: './visualizar-racas.component.html',
  styleUrl: './visualizar-racas.component.css'
})
export class VisualizarRacasComponent {
  service: PetshopService = inject(PetshopService);
}
