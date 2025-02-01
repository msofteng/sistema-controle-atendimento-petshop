import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { CadastroPetComponent } from "../../../shared/components/forms/cadastros/cadastro-pet/cadastro-pet.component";
import { ModalComponent } from "../../../shared/components/page/modal/modal.component";
import { Cliente, Pet, Raca } from '../../../shared/interfaces/petshop.entities';
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

    this.service.listarPets({ qtd: 0, page: 0 }).subscribe({
      next: (pets: Pet[]) => this.pets = pets,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });

    this.service.listarRacas({ qtd: 0, page: 0 }).subscribe({
      next: (racas: Raca[]) => this.racas = racas,
      error: (err: HttpErrorResponse) => console.error(err),
    });
  }

  petAdicionado(pet: Pet) {
    this.service.listarClientes({ qtd: 0, page: 0 }).subscribe({
      next: (clientes: Cliente[]) => {
        if (pet.id && pet.id > 0) {
          pet.cliente = clientes.find(p => p.id === pet.id) as Cliente;
          pet.cliente.dataCadastro = (pet.cliente.dataCadastro as Date).toISOString().split('T')[0];
          pet.cliente.pets = [];

          let cli = pet.cliente;
          cli.contatos = [];
          cli.enderecos = [];
          cli.pets = [];

          pet.cliente.contatos = pet.cliente.contatos.map(c => {
            c.cliente = cli;
            return c;
          });

          pet.cliente.enderecos = pet.cliente.enderecos.map(e => {
            e.cliente = cli;
            return e;
          });
        }

        this.service.cadastrarPet(pet).subscribe({
          next: (data: Pet) => {
            this.isLoading = true;

            this.service.listarPets({ qtd: 0, page: 0 }).subscribe({
              next: (pets: Pet[]) => this.pets = pets,
              error: (err: HttpErrorResponse) => console.error(err),
              complete: () => this.isLoading = false,
            });

            this.service.listarRacas({ qtd: 0, page: 0 }).subscribe({
              next: (racas: Raca[]) => this.racas = racas,
              error: (err: HttpErrorResponse) => console.error(err),
            });

            this.openModalAtualizarPet = false;
            this.petSelecionadoEdicao = undefined;
          },
          error: (err: HttpErrorResponse) => console.error(err),
        });
      },
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }

  editarPet(pet: Pet) {
    this.petSelecionadoEdicao = pet;
    this.openModalAtualizarPet = true;
  }

  excluirPet(pet: Pet) {
    this.isLoading = true;

    if (pet.dataNascimento instanceof Date)
      pet.dataNascimento = (pet.dataNascimento as Date).toISOString().split('T')[0];

    this.service.excluirPet(pet).subscribe({
      next: (res: boolean) => this.pets = this.pets.filter(a => a.id !== pet.id),
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }

  formatarRacas(racas?: Raca[]) {
    return racas ? racas.map(r => r.descricao).join(', ') : '';
  }
}