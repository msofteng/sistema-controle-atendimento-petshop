import { Component, inject } from '@angular/core';
import { PetshopService } from '../../../shared/services/petshop.service';

@Component({
  selector: 'app-visualizar-pets',
  imports: [],
  templateUrl: './visualizar-pets.component.html',
  styleUrl: './visualizar-pets.component.css'
})
export class VisualizarPetsComponent {
  service: PetshopService = inject(PetshopService);
}
