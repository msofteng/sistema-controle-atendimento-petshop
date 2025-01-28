import { Component, inject } from '@angular/core';
import { PetshopService } from '../../shared/services/petshop.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  service: PetshopService = inject(PetshopService);
}
