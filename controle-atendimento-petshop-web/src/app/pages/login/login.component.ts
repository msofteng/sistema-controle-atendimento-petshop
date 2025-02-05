import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from '../../shared/interfaces/login-response';
import { PetshopService } from '../../shared/services/petshop.service';

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

  loginForm: FormGroup = new FormGroup({
    nomeCpf: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });

  btnDisabled = false;

  enviarLogin(event: SubmitEvent) {
    if (this.loginForm.valid) {
      this.btnDisabled = true;

      this.service.login(this.loginForm.value).subscribe({
        next: (value: LoginResponse) => {
          console.log(value);
        },
        error: (err: HttpErrorResponse) => console.error(err)
      });
      this.btnDisabled = false;
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}