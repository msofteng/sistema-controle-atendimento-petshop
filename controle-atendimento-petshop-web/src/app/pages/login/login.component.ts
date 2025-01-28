import { Component, OnInit, inject } from '@angular/core';
import { PetshopService } from '../../shared/services/petshop.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginParams } from '../../shared/interfaces/login-params';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../../shared/interfaces/petshop.entities';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  service: PetshopService = inject(PetshopService);
  toastr: ToastrService = inject(ToastrService);

  loginForm: FormGroup = new FormGroup({
    nomeCpf: new FormControl<string | number>('', [Validators.required]),
    senha: new FormControl<string>('', [Validators.required])
  });

  btnDisabled = false;

  enviarLogin(event: SubmitEvent) {
    if (this.loginForm.valid) {
      if (!isNaN(this.loginForm.get('nomeCpf')?.value) && this.loginForm.get('nomeCpf')?.value.length === 11) {
        this.loginForm.get('nomeCpf')?.setValue(Number(this.loginForm.value.nomeCpf));
      }

      this.btnDisabled = true;

      this.service.login(this.loginForm.value).subscribe({
        next: (value: Usuario) => {
          console.log(value);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
        complete: () => {
          this.btnDisabled = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
