import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/page/footer/footer.component';
import { HeaderComponent } from '../../shared/components/page/header/header.component';
import { CookieService } from 'ngx-cookie-service';
import { ResponseError } from '../../shared/interfaces/response';
import { PetshopService } from '../../shared/services/petshop.service';
import HttpErrorResponse from '../../core/errors/http-error-response';

@Component({
  selector: 'app-main-page',
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  service: PetshopService = inject(PetshopService);
  cookieService = inject(CookieService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.service.getUsuarioLogado().subscribe({
      next: (usuario) => this.service.setUsuario(usuario),
      error: (err: HttpErrorResponse<ResponseError>) => {
        if (err.error.status == 401 || err.error.status == 500) {
          // saindo
          this.cookieService.delete('token');
          this.service.setUsuario(undefined);
        }
      },
    });
  }
}