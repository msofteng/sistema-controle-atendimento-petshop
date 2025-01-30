import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';

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