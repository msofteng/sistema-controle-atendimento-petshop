import { Component, OnInit, inject } from '@angular/core';
import { PetshopService } from '../../../shared/services/petshop.service';
import { Pet, Raca } from '../../../shared/interfaces/petshop.entities';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-visualizar-pets',
  imports: [],
  templateUrl: './visualizar-pets.component.html',
  styleUrl: './visualizar-pets.component.css'
})
export class VisualizarPetsComponent implements OnInit {
  service: PetshopService = inject(PetshopService);

  pets: Pet[] = [];

  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;

    this.service.listarPets({ qtd: 10, page: 1 }).subscribe({
      next: (pets: Pet[]) => this.pets = pets,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    })
  }

  formatarRacas(racas: Raca[]) {
    return racas.map(r => r.descricao).join(', ');
  }
}
