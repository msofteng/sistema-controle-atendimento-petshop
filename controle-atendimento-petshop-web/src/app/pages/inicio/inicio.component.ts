import { Component, inject } from '@angular/core';
import { ModalComponent } from '../../shared/components/page/modal/modal.component';
import { PetshopService } from '../../shared/services/petshop.service';

@Component({
  selector: 'app-inicio',
  imports: [
    ModalComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  openModal = false;
}