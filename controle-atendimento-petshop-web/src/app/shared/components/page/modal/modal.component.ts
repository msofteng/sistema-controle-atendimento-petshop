import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input({ required: true }) openModal!: boolean;
  @Output() openModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}