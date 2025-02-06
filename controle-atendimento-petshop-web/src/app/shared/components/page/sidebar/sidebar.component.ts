import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input({ required: true }) openMenu!: boolean;
  @Input({ required: true }) isCliente!: boolean;
  @Output() openMenuChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}