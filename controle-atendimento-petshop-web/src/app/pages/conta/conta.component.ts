import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Perfil } from '../../shared/enums/perfil';
import { Usuario } from '../../shared/interfaces/petshop.entities';
import { ResponseError } from '../../shared/interfaces/response';
import { PetshopService } from '../../shared/services/petshop.service';
import { changePerfil } from '../../shared/utils/change-enum';
import { base64ToFile, convertFileToBase64 } from '../../shared/utils/file';

import HttpErrorResponse from '../../core/errors/http-error-response';

@Component({
  selector: 'app-conta',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css'
})
export class ContaComponent implements OnInit {
  service: PetshopService = inject(PetshopService);

  atualizacaoForm: FormGroup = new FormGroup({
    nome: new FormControl<string>('', [Validators.required]),
    perfil: new FormControl<Perfil>(Perfil.ADMIN, [Validators.required]),
    password: new FormControl<string>('', []),
    cpf: new FormControl<string>('', []),
    foto: new FormControl<string>('', [])
  });

  btnDisabled = false;

  @ViewChild('fotoUsuario')
  private fotoUsuario!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    // pega os dados do usuário logado
    this.btnDisabled = true;

    // buscar os dados do cliente logado por JWT

    this.service.getUsuarioLogado().subscribe({
      next: (value: Usuario) => {
        value.password = '';
        this.atualizacaoForm.patchValue(value);

        if (value.foto) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(base64ToFile(value.foto));

          this.fotoUsuario.nativeElement.files = dataTransfer.files;
        }

        this.btnDisabled = false;
      },
      error: (err: HttpErrorResponse<ResponseError>) => {
        console.error(err);
        this.btnDisabled = false;
      }
    });
  }

  atualizaCadastro(event: SubmitEvent) {
    if (this.atualizacaoForm.valid) {
      this.atualizacaoForm.get('perfil')?.setValue(changePerfil(this.atualizacaoForm.get('perfil')?.value));

      if (!this.atualizacaoForm.value.cpf)
        delete this.atualizacaoForm.value.cpf;

      if (!this.atualizacaoForm.value.foto)
        delete this.atualizacaoForm.value.foto;

      this.btnDisabled = true;

      this.service.cadastrarFuncionario(this.atualizacaoForm.value).subscribe({
        next: (value: Usuario) => {
          console.log(value);
        },
        error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
        complete: () => this.btnDisabled = false,
      });
    } else {
      this.atualizacaoForm.markAllAsTouched();
    }
  }

  onImagePicked(event: Event) {
    let files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      convertFileToBase64(files[0])
        .then(base64 => this.atualizacaoForm.get('foto')?.setValue(base64));
    } else {
      this.atualizacaoForm.get('foto')?.setValue('');
    }
  }
}