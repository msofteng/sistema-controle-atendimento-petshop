import { Component, inject } from '@angular/core';
import { PetshopService } from '../../shared/services/petshop.service';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  service: PetshopService = inject(PetshopService);
}
