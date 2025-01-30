import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { CadastroPetComponent } from "../../../shared/components/forms/cadastros/cadastro-pet/cadastro-pet.component";
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { Pet, Raca } from '../../../shared/interfaces/petshop.entities';
import { PetshopService } from '../../../shared/services/petshop.service';

@Component({
  selector: 'app-visualizar-pets',
  imports: [
    CadastroPetComponent,
    ModalComponent
  ],
  templateUrl: './visualizar-pets.component.html',
  styleUrl: './visualizar-pets.component.css'
})
export class VisualizarPetsComponent implements OnInit {
  service: PetshopService = inject(PetshopService);

  pets: Pet[] = [];
  racas: Raca[] = [];

  isLoading = false;
  openModalAtualizarPet = false;

  petSelecionadoEdicao?: Pet;

  ngOnInit(): void {
    this.isLoading = true;

    this.service.listarPets({ qtd: 10, page: 1 }).subscribe({
      next: (pets: Pet[]) => this.pets = pets,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });

    this.service.listarRacas({ qtd: 10, page: 1 }).subscribe({
      next: (racas: Raca[]) => this.racas = racas,
      error: (err: HttpErrorResponse) => console.error(err),
    });
  }

  petAdicionado(pet: Pet) {
    this.service.cadastrarPet(pet).subscribe({
      next: (data: Pet) => console.log('sucesso'),
      error: (err: HttpErrorResponse) => console.error(err),
    });

    this.isLoading = true;

    this.service.listarPets({ qtd: 10, page: 1 }).subscribe({
      next: (pets: Pet[]) => this.pets = pets,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });

    this.openModalAtualizarPet = false;
    this.petSelecionadoEdicao = undefined;
  }

  editarPet(pet: Pet) {
    this.petSelecionadoEdicao = pet;
    this.openModalAtualizarPet = true;
  }

  excluirPet(pet: Pet) {
    this.isLoading = true;

    this.service.excluirPet(pet).subscribe({
      next: (res: boolean) => this.pets = this.pets.filter(a => a.id !== pet.id),
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }

  formatarRacas(racas: Raca[]) {
    return racas.map(r => r.descricao).join(', ');
  }
}