import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-raca',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-raca.component.html',
  styleUrl: './cadastro-raca.component.css'
})
export class CadastroRacaComponent {
  racaForm: FormGroup = new FormGroup({
    id: new FormControl<number>(0, []),
    descricao: new FormControl<string>('', [Validators.required]),
  });

  adicionarRaca(event: SubmitEvent) {
    if (this.racaForm.valid) {
      if (!this.racaForm.value.id) delete this.racaForm.value.id;
      console.log(this.racaForm.value);
    } else {
      this.racaForm.markAllAsTouched();
    }
  }
}
