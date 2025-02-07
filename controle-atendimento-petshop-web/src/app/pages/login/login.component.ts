import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from '../../shared/interfaces/login-response';
import { ResponseError } from '../../shared/interfaces/response';
import { PetshopService } from '../../shared/services/petshop.service';
import { Router } from '@angular/router';

import HttpErrorResponse from '../../core/errors/http-error-response';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  service: PetshopService = inject(PetshopService);
  cookieService: CookieService = inject(CookieService);
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    nomeCpf: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });

  btnDisabled = false;

  enviarLogin(event: SubmitEvent) {
    if (this.loginForm.valid) {
      this.btnDisabled = true;

      this.service.login(this.loginForm.value).subscribe({
        next: (data: LoginResponse) => {
          this.cookieService.set('token', data.token, { expires: data.expiresIn });
          this.router.navigate(['/dashboard']);
          this.btnDisabled = false;
        },
        error: (err: HttpErrorResponse<ResponseError>) => {
          this.toastr.error(`
            <details>
              <summary>Erro: ${err.error.message}</summary>
              ${err.error.detail}
            </details>
          `);
          this.btnDisabled = false;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}