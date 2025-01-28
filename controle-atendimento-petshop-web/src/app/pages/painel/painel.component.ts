import { Component, inject } from '@angular/core';
import { PetshopService } from '../../shared/services/petshop.service';

@Component({
  selector: 'app-painel',
  imports: [],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})
export class PainelComponent {
  service: PetshopService = inject(PetshopService);
}
