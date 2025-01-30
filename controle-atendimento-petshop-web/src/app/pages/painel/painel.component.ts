import { Component, inject } from '@angular/core';
import { PetshopMockService } from '../../shared/services/petshop-mock.service';

@Component({
  selector: 'app-painel',
  imports: [],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})
export class PainelComponent {
  service: PetshopMockService = inject(PetshopMockService);
}