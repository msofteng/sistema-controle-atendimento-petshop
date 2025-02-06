import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Atendimento, Usuario, Pet, Raca } from '../../../../interfaces/petshop.entities';
import { CadastroClienteComponent } from "../cadastro-cliente/cadastro-cliente.component";
import { CadastroPetComponent } from "../cadastro-pet/cadastro-pet.component";

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
    data: new FormControl<Date | string>(new Date().toISOString().split('T')[0], []),
    cliente: new FormControl<string>('', [Validators.required]),
  });

  @Input()
  atendimento?: Atendimento;

  @Output()
  atendimentoAdicionado: EventEmitter<Atendimento> = new EventEmitter<Atendimento>();

  @Input({ required: true })
  clientes!: Usuario[];

  @Input({ required: true })
  pets!: Pet[];

  @Output()
  buscarPetsCliente: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  @Input({ required: true })
  racas!: Raca[];

  @ViewChild('selectPets')
  private selectPets!: ElementRef<HTMLSelectElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['atendimento']?.previousValue !== changes['atendimento']?.currentValue && this.atendimento) {
      this.atendimentoForm.patchValue(this.atendimento);

      if (this.atendimento.data instanceof Date) this.atendimentoForm.get('data')?.setValue((this.atendimento.data as Date).toISOString().split('T')[0]);
      if (this.atendimento.pets && this.atendimento.pets.length > 0) this.atendimentoForm.get('cliente')?.setValue(this.atendimento.pets[0].cliente?.nome);
      this.atualizarCliente();

      setTimeout(() => {
        if (this.atendimento) {
          for (let i = 0; i < this.atendimento.pets.length; i++) {
            let index = Array.from(this.selectPets.nativeElement.options).findIndex(option => option.textContent?.trim() === this.atendimento?.pets[i].nome.trim());
            if (this.selectPets.nativeElement.options.item(index))
              this.selectPets.nativeElement.options.item(index)!.selected = true;
          }
        }
      }, 3000);
    }
  }

  adicionarAtendimento(event: SubmitEvent) {
    if (this.getPetsSelecionados.length == 0) {
      console.log('selecione um pet ou adicione um na lista');
    }

    if (this.atendimentoForm.valid && this.getPetsSelecionados().length > 0) {
      if (!this.atendimentoForm.value.id && !this.atendimento)
        delete this.atendimentoForm.value.id;

      let cliente = this.clientes.find(cli => cli.nome === this.atendimentoForm.get('cliente')?.value) as Usuario;
      
      cliente.dataCadastro = new Date(cliente.dataCadastro).toISOString().split('T')[0];
      cliente.pets = [];

      this.atendimentoForm.value.pets = this.getPetsSelecionados().map<Pet>((petName) => {
        let pet = this.pets.find(pet => pet.nome === petName) as Pet;
        pet.cliente = cliente;
        pet.dataNascimento = new Date(pet.dataNascimento).toISOString().split('T')[0];
        pet.raca = pet.raca.map(r => this.racas.find(rc => rc.descricao === r.descricao) ?? r);
        return pet;
      });

      this.atendimentoAdicionado.emit(this.atendimentoForm.value);

      this.atendimentoForm.reset();
      this.atendimentoForm.get('data')?.setValue(new Date());
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

  adicionarCliente(cliente: Usuario) {
    this.clientes.push(cliente);
    setTimeout(() => {
      this.atendimentoForm.get('cliente')?.setValue(cliente.nome);
      this.atualizarCliente();
    });
  }

  atualizarCliente() {
    this.buscarPetsCliente.emit(this.clientes.find(cli => cli.nome === this.atendimentoForm.get('cliente')?.value));
  }

  getPetsSelecionados(): string[] {
    return Array.from(this.selectPets.nativeElement.options).filter(option => option.selected).map(option => `${option.textContent}`);
  }
}