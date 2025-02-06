import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/page/header/header.component';
import { SidebarComponent } from '../../shared/components/page/sidebar/sidebar.component';
import { PetshopService } from '../../shared/services/petshop.service';
import HttpErrorResponse from '../../core/errors/http-error-response';
import { ResponseError } from '../../shared/interfaces/response';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../../shared/interfaces/petshop.entities';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  service: PetshopService = inject(PetshopService);
  cookieService = inject(CookieService);
  router: Router = inject(Router);

  openSidebar = true;
  usuarioLogado?: Usuario;

  ngOnInit(): void {
    this.service.getUsuarioLogado().subscribe({
      next: (usuario) => this.service.setUsuario(usuario),
      error: (err: HttpErrorResponse<ResponseError>) => {
        if (err.error.status == 401 || err.error.status == 500) {
          // saindo
          this.cookieService.delete('token');
          this.service.setUsuario(undefined);
          this.router.navigate(['/login']);
        }
      },
    });
    
    this.service.getUsuario().subscribe(usuario => this.usuarioLogado = usuario);
  }
}