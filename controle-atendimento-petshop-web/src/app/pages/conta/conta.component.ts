import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Perfil } from '../../shared/enums/perfil';
import { Usuario } from '../../shared/interfaces/petshop.entities';
import { PetshopService } from '../../shared/services/petshop.service';
import { base64ToFile, convertFileToBase64 } from '../../shared/utils/util';

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
    senha: new FormControl<string>('', [Validators.required]),
    cpf: new FormControl<string>('', []),
    foto: new FormControl<string>('', [])
  });

  btnDisabled = false;

  @ViewChild('fotoUsuario')
  private fotoUsuario!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    // pega os dados do usuário logado
    this.btnDisabled = true;

    this.service.login({
      nomeCpf: '',
      senha: ''
    }).subscribe({
      next: (value: Usuario) => {
        this.atualizacaoForm.patchValue(value);

        if (value.foto) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(base64ToFile(value.foto));

          this.fotoUsuario.nativeElement.files = dataTransfer.files;
        }
      },
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.btnDisabled = false,
    });
  }

  atualizaCadastro(event: SubmitEvent) {
    if (this.atualizacaoForm.valid) {
      this.atualizacaoForm.get('perfil')?.setValue((this.atualizacaoForm.get('perfil')?.value === 'cliente') ? Perfil.CLIENTE : Perfil.ADMIN);

      if (!isNaN(this.atualizacaoForm.get('cpf')?.value) && this.atualizacaoForm.get('cpf')?.value.length === 11) {
        this.atualizacaoForm.get('cpf')?.setValue(Number(this.atualizacaoForm.value.cpf));
      }

      if (!this.atualizacaoForm.value.foto) delete this.atualizacaoForm.value.foto;

      this.btnDisabled = true;

      this.service.cadastrarFuncionario(this.atualizacaoForm.value).subscribe({
        next: (value: Usuario) => {
          console.log(value);
        },
        error: (err: HttpErrorResponse) => console.error(err),
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
        .then(base64 => this.atualizacaoForm.get('foto')?.setValue(base64))
        .catch(error => console.error('Erro ao converter arquivo para base64:', error));
    } else {
      this.atualizacaoForm.get('foto')?.setValue('');
    }
  }
}