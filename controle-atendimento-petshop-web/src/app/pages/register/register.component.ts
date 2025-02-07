import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Perfil } from '../../shared/enums/perfil';
import { Usuario } from '../../shared/interfaces/petshop.entities';
import { ResponseError } from '../../shared/interfaces/response';
import { PetshopService } from '../../shared/services/petshop.service';
import { convertFileToBase64 } from '../../shared/utils/file';

import HttpErrorResponse from '../../core/errors/http-error-response';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  service: PetshopService = inject(PetshopService);
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl<string>('', [Validators.required]),
    perfil: new FormControl<Perfil>(Perfil.ADMIN, [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
    cpf: new FormControl<string>('', [Validators.required]),
    foto: new FormControl<string>('', []),
    dataCadastro: new FormControl<string>(new Date().toISOString().split('T')[0], []),
  });

  btnDisabled = false;

  @ViewChild('fotoUsuario')
  private fotoUsuario!: ElementRef<HTMLInputElement>;

  enviarCadastro(event: SubmitEvent) {
    if (this.cadastroForm.valid) {
      if (!this.cadastroForm.value.cpf)
        delete this.cadastroForm.value.cpf;

      if (!this.cadastroForm.value.foto)
        delete this.cadastroForm.value.foto;

      this.cadastroForm.value.dataCadastro = new Date().toISOString().split('T')[0];

      this.btnDisabled = true;

      this.service.cadastrarFuncionario(this.cadastroForm.value).subscribe({
        next: (value: Usuario) => {
          this.cadastroForm.reset();
          this.cadastroForm.get('perfil')?.setValue(Perfil.ADMIN);
          this.fotoUsuario.nativeElement.value = '';
          this.btnDisabled = false;
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse<ResponseError>) => this.mostrarErro(err)
      });
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }

  onImagePicked(event: Event) {
    let files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      convertFileToBase64(files[0])
        .then(base64 => this.cadastroForm.get('foto')?.setValue(base64))
    } else {
      this.cadastroForm.get('foto')?.setValue('');
    }
  }

  mostrarErro(err: HttpErrorResponse<ResponseError>) {
    this.toastr.error(`
      <details>
        <summary>Erro: ${err.error.message}</summary>
        ${err.error.detail}
      </details>
    `);
    this.btnDisabled = false;
  }
}