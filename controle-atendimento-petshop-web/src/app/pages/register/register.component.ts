import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Perfil } from '../../shared/enums/perfil';
import { Usuario } from '../../shared/interfaces/petshop.entities';
import { PetshopService } from '../../shared/services/petshop.service';
import { convertFileToBase64 } from '../../shared/utils/file';
import { changePerfil } from '../../shared/utils/change-enum';

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

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl<string>('', [Validators.required]),
    perfil: new FormControl<Perfil>(Perfil.ADMIN, [Validators.required]),
    senha: new FormControl<string>('', [Validators.required]),
    cpf: new FormControl<string>('', []),
    foto: new FormControl<string>('', [])
  });

  btnDisabled = false;

  @ViewChild('fotoUsuario')
  private fotoUsuario!: ElementRef<HTMLInputElement>;

  enviarCadastro(event: SubmitEvent) {
    if (this.cadastroForm.valid) {
      this.cadastroForm.get('perfil')?.setValue(changePerfil(this.cadastroForm.get('perfil')?.value));

      if (!isNaN(this.cadastroForm.get('cpf')?.value) && this.cadastroForm.get('cpf')?.value.length === 11)
        this.cadastroForm.get('cpf')?.setValue(Number(this.cadastroForm.value.cpf));

      if (!this.cadastroForm.value.foto)
        delete this.cadastroForm.value.foto;

      this.btnDisabled = true;

      this.service.cadastrarFuncionario(this.cadastroForm.value).subscribe({
        next: (value: Usuario) => {
          console.log(value);
          this.cadastroForm.reset();
          this.cadastroForm.get('perfil')?.setValue(Perfil.ADMIN);
          this.fotoUsuario.nativeElement.value = '';
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.btnDisabled = false;
        },
        complete: () => this.btnDisabled = false,
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
        .catch(error => console.error('Erro ao converter arquivo para base64:', error));
    } else {
      this.cadastroForm.get('foto')?.setValue('');
    }
  }
}