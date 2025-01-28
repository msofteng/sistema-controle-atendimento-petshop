import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showMenu = false;

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  // Close the menu when clicking outside of the image and menu
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const menuContainer = document.querySelector('.menu-container');
    if (menuContainer && !menuContainer.contains(event.target as Node)) {
      this.showMenu = false;
    }
  }
}