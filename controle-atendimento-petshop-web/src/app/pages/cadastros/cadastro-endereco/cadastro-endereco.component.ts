import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-endereco',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-endereco.component.html',
  styleUrl: './cadastro-endereco.component.css'
})
export class CadastroEnderecoComponent {
  enderecoForm: FormGroup = new FormGroup({
    id: new FormControl<number>(0, []),
    logradouro: new FormControl<string>('', [Validators.required]),
    cidade: new FormControl<string>('', [Validators.required]),
    bairro: new FormControl<string>('', [Validators.required]),
    complemento: new FormControl<string>('', []),
    tag: new FormControl<string>('', [])
  });

  adicionarEndereco(event: SubmitEvent) {
    if (this.enderecoForm.valid) {
      if (!this.enderecoForm.value.id) delete this.enderecoForm.value.id;
      if (!this.enderecoForm.value.complemento) delete this.enderecoForm.value.complemento;
      if (!this.enderecoForm.value.tag) delete this.enderecoForm.value.tag;

      console.log(this.enderecoForm.value);
    } else {
      this.enderecoForm.markAllAsTouched();
    }
  }
}
