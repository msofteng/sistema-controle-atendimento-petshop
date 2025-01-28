import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TipoContato } from '../../../shared/enums/tipo-contato';

@Component({
  selector: 'app-cadastro-contato',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-contato.component.html',
  styleUrl: './cadastro-contato.component.css'
})
export class CadastroContatoComponent {
  contatoForm: FormGroup = new FormGroup({
    id: new FormControl<number>(0, []),
    valor: new FormControl<string>('', [Validators.required]),
    tipo: new FormControl<TipoContato | string>('', [Validators.required]),
    tag: new FormControl<string>('', [])
  });

  adicionarContato(event: SubmitEvent) {
    if (this.contatoForm.valid) {
      this.contatoForm.get('tipo')?.setValue((this.contatoForm.value.tipo === 'e-mail') ? TipoContato.EMAIL : TipoContato.TELEFONE);

      if (!this.contatoForm.value.id) delete this.contatoForm.value.id;
      if (!this.contatoForm.value.tag) delete this.contatoForm.value.tag;
      
      console.log(this.contatoForm.value);
    } else {
      this.contatoForm.markAllAsTouched();
    }
  }
}
