import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../shared/interfaces/petshop.entities';
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
