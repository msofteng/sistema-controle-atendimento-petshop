import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pet, Raca } from '../../../shared/interfaces/petshop.entities';
import { base64ToFile, convertFileToBase64 } from '../../../shared/utils/util';
import { CadastroRacaComponent } from "../cadastro-raca/cadastro-raca.component";

@Component({
  selector: 'app-cadastro-pet',
  imports: [
    ReactiveFormsModule,
    CadastroRacaComponent
  ],
  templateUrl: './cadastro-pet.component.html',
  styleUrl: './cadastro-pet.component.css'
})
export class CadastroPetComponent implements OnChanges {
  petForm: FormGroup = new FormGroup({
    id: new FormControl<number>(0, []),
    nome: new FormControl<string>('', [Validators.required]),
    dataNascimento: new FormControl<Date | string>('', [Validators.required]),
    raca: new FormArray([], []),
    foto: new FormControl('', []),
  });

  @Input()
  pet?: Pet;

  @Output()
  petAdicionado: EventEmitter<Pet> = new EventEmitter<Pet>();

  @Input({ required: true })
  racas!: Raca[];

  @ViewChild('selectRacas')
  private selectRacas!: ElementRef<HTMLSelectElement>;

  @ViewChild('fotoPet')
  private fotoPet!: ElementRef<HTMLInputElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pet']?.previousValue !== changes['pet']?.currentValue && this.pet) {
      this.petForm.patchValue(this.pet);
      this.petForm.get('dataNascimento')?.setValue((this.pet.dataNascimento as Date).toISOString().split('T')[0]);
      let options = this.pet.raca.map<HTMLOptionElement>(r => Array.from(this.selectRacas.nativeElement.options).find(option => option.textContent?.trim() === r.descricao.trim()) as HTMLOptionElement);

      options.forEach(option => option.selected = true);

      if (this.pet.foto) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(base64ToFile(this.pet.foto));

        this.fotoPet.nativeElement.files = dataTransfer.files;
      }
    }
  }

  adicionarRacaPet(raca: Raca) {
    this.racas.push(raca);
    setTimeout(() => {
      let index = Array.from(this.selectRacas.nativeElement.options).findIndex(option => option.textContent?.trim() === raca.descricao.trim());
      this.selectRacas.nativeElement.options.item(index)!.selected = true;
    });
  }

  removerRacasSelecionadas(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const selectedRacas = this.getRacasSelecionadas();
    this.racas = this.racas.filter(raca => !selectedRacas.includes(raca.descricao));
  }

  getRacasSelecionadas(): string[] {
    return Array.from(this.selectRacas.nativeElement.options).filter(option => option.selected).map(option => option.textContent ?? '');
  }

  adicionarPet(event: SubmitEvent) {
    if (this.petForm.valid && this.getRacasSelecionadas().length > 0) {
      if (!this.petForm.value.id) delete this.petForm.value.id;
      if (!this.petForm.value.foto) delete this.petForm.value.foto;

      this.petForm.value.raca = this.getRacasSelecionadas().map<Raca>((racaName) => this.racas.find(raca => raca.descricao === racaName) as Raca);

      this.petAdicionado.emit(this.petForm.value);

      this.petForm.reset();
      this.fotoPet.nativeElement.value = '';

      Array.from(this.selectRacas.nativeElement.options).forEach((_, index) => this.selectRacas.nativeElement.options.item(index)!.selected = false);
    } else {
      this.petForm.markAllAsTouched();
    }
  }

  onImagePicked(event: Event) {
    let files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      convertFileToBase64(files[0])
        .then(base64 => this.petForm.get('foto')?.setValue(base64))
        .catch(error => console.error('Erro ao converter arquivo para base64:', error));
    } else {
      this.petForm.get('foto')?.setValue('');
    }
  }
}