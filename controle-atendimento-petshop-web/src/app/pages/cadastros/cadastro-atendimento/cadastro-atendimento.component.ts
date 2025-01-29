import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CadastroClienteComponent } from "../cadastro-cliente/cadastro-cliente.component";
import { CadastroPetComponent } from "../cadastro-pet/cadastro-pet.component";
import { Atendimento, Cliente, Pet, Raca } from '../../../shared/interfaces/petshop.entities';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-atendimento',
  imports: [
    ReactiveFormsModule,
    CadastroClienteComponent,
    CadastroPetComponent
],
  templateUrl: './cadastro-atendimento.component.html',
  styleUrl: './cadastro-atendimento.component.css'
})
export class CadastroAtendimentoComponent implements OnChanges {
  atendimentoForm: FormGroup = new FormGroup({
    id: new FormControl<number>(0, []),
    descricao: new FormControl<string>('', [Validators.required]),
    valor: new FormControl<string>('', [Validators.required]),
    data: new FormControl<Date>(new Date(), []),
    cliente: new FormControl<string>('', [Validators.required]),
  });

  @Input()
  atendimento?: Atendimento;

  @Output()
  atendimentoAdicionado: EventEmitter<Atendimento> = new EventEmitter<Atendimento>();

  @Input({ required: true })
  clientes!: Cliente[];

  @Input({ required: true })
  pets!: Pet[];

  @Output()
  buscarPetsCliente: EventEmitter<Cliente> = new EventEmitter<Cliente>();

  @Input({ required: true })
  racas!: Raca[];

  @ViewChild('selectCliente')
  private selectCliente!: ElementRef<HTMLSelectElement>;

  @ViewChild('selectPets')
  private selectPets!: ElementRef<HTMLSelectElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['atendimento']?.previousValue !== changes['atendimento']?.currentValue && this.atendimento) {
      this.atendimentoForm.patchValue(this.atendimento);
      this.pets = this.atendimento.pets;
    }
  }

  adicionarAtendimento(event: SubmitEvent) {
    if (this.atendimentoForm.valid) {
      if (!this.atendimentoForm.value.id) delete this.atendimentoForm.value.id;

      this.atendimentoForm.get('data')?.setValue(this.atendimentoForm.get('data')?.value.toISOString().split('T')[0]);

      let cliente = this.clientes.find(cli => cli.nome === this.atendimentoForm.get('cliente')?.value) as Cliente;

      this.pets = this.pets.map<Pet>(pet => {
        pet.cliente = cliente;
        return pet;
      });

      this.atendimentoForm.value.pets = this.pets;

      this.atendimentoAdicionado.emit(this.atendimentoForm.value);

      this.atendimentoForm.reset();
      this.atendimentoForm.get('data')?.setValue(new Date());

      // Array.from(this.selectPets.nativeElement.options).forEach((_, index) => this.selectPets.nativeElement.options.item(index)!.selected = false);
      // Array.from(this.selectCliente.nativeElement.options).forEach((_, index) => this.selectCliente.nativeElement.options.item(index)!.selected = false);
    } else {
      this.atendimentoForm.markAllAsTouched();
    }
  }

  adicionarPet(pet: Pet) {
    this.pets.push(pet);
    setTimeout(() => {
      let index = Array.from(this.selectPets.nativeElement.options).findIndex(option => option.textContent?.trim() === pet.nome.trim());
      this.selectPets.nativeElement.options.item(index)!.selected = true;
    });
  }

  adicionarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
    setTimeout(() => {
      this.atendimentoForm.get('cliente')?.setValue(cliente.nome);
      this.atualizarCliente();
    });
  }

  atualizarCliente() {
    this.buscarPetsCliente.emit(this.clientes.find(cli => cli.nome === this.atendimentoForm.get('cliente')?.value));
  }
}
