import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from '../../shared/interfaces/login-response';
import { ResponseError } from '../../shared/interfaces/response';
import { PetshopService } from '../../shared/services/petshop.service';

import HttpErrorResponse from '../../core/errors/http-error-response';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

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
  toastr: ToastrService = inject(ToastrService);
  cookieService: CookieService = inject(CookieService);
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
          console.log(err.error.message);
          this.btnDisabled = false;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}