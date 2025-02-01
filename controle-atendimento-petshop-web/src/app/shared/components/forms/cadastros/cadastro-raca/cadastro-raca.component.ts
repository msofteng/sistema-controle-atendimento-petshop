import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Raca } from '../../../../interfaces/petshop.entities';

@Component({
  selector: 'app-cadastro-raca',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-raca.component.html',
  styleUrl: './cadastro-raca.component.css'
})
export class CadastroRacaComponent implements OnChanges {
  racaForm: FormGroup = new FormGroup({
    id: new FormControl<number>(0, []),
    descricao: new FormControl<string>('', [Validators.required]),
  });

  @Input()
  raca?: Raca;

  @Output()
  racaAdicionada: EventEmitter<Raca> = new EventEmitter<Raca>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['raca'].previousValue !== changes['raca'].currentValue && this.raca)
      this.racaForm.patchValue(this.raca);
  }

  adicionarRaca(event: SubmitEvent) {
    if (this.racaForm.valid) {
      if (!this.racaForm.value.id)
        delete this.racaForm.value.id;
      this.racaAdicionada.emit(this.racaForm.value);
      this.racaForm.reset();
    } else {
      this.racaForm.markAllAsTouched();
    }
  }
}