import { Component, inject } from '@angular/core';
import { PetshopService } from '../../../shared/services/petshop.service';

@Component({
  selector: 'app-visualizar-atendimentos',
  imports: [],
  templateUrl: './visualizar-atendimentos.component.html',
  styleUrl: './visualizar-atendimentos.component.css'
})
export class VisualizarAtendimentosComponent {
  service: PetshopService = inject(PetshopService);
}
