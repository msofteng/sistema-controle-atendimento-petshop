import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../../../interfaces/petshop.entities';
import { PetshopService } from '../../../services/petshop.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  service: PetshopService = inject(PetshopService);
  cookieService = inject(CookieService);
  router: Router = inject(Router);
  
  usuarioLogado?: Usuario;
  showMenu = false;
  
  ngOnInit(): void {
    this.service.getUsuario().subscribe(usuario => this.usuarioLogado = usuario);
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const menuContainer = document.querySelector('.menu-container');
    
    if (menuContainer && !menuContainer.contains(event.target as Node))
      this.showMenu = false;
  }
  
  sair() {
    // saindo
    this.cookieService.delete('token');
    this.service.setUsuario(undefined);
    this.router.navigate(['/']);
  }
}