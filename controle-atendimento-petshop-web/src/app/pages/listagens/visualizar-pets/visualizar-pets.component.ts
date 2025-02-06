import { Component, OnInit, inject } from '@angular/core';
import { CadastroPetComponent } from "../../../shared/components/forms/cadastros/cadastro-pet/cadastro-pet.component";
import { ModalComponent } from "../../../shared/components/page/modal/modal.component";
import { Usuario, Contato, Endereco, Pet, Raca } from '../../../shared/interfaces/petshop.entities';
import { ResponseError } from '../../../shared/interfaces/response';
import { PetshopService } from '../../../shared/services/petshop.service';

import HttpErrorResponse from '../../../core/errors/http-error-response';

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
  clientes: Usuario[] = [];

  isLoading = false;
  openModalAtualizarPet = false;

  petSelecionadoEdicao?: Pet;
  usuarioLogado?: Usuario;

  ngOnInit(): void {
    this.buscarClientesPetsRacas();
    this.service.getUsuario().subscribe(usuario => this.usuarioLogado = usuario);
  }

  petAdicionado(pet: Pet) {
    console.log(pet);
    if (pet.id && pet.id > 0) {
      if (pet.cliente)
        pet.cliente = this.clientes.find(cli => cli.nome === pet.cliente.nome) ?? pet.cliente;
      else
        pet.cliente = this.petSelecionadoEdicao!.cliente;
      
      if (pet.cliente.dataCadastro && pet.cliente.dataCadastro instanceof Date) pet.cliente.dataCadastro = (pet.cliente.dataCadastro as Date).toISOString().split('T')[0];
      pet.cliente.pets = [];

      let cli = pet.cliente;
      cli.contatos = [];
      cli.enderecos = [];
      cli.pets = [];

      pet.cliente.contatos = this.adicionarClienteContatos(cli, pet.cliente.contatos ?? []);
      pet.cliente.enderecos = this.adicionarClienteEnderecos(cli, pet.cliente.enderecos ?? []);
    }

    this.service.cadastrarPet(pet).subscribe({
      next: (data: Pet) => {
        this.buscarClientesPetsRacas();

        this.openModalAtualizarPet = false;
        this.petSelecionadoEdicao = undefined;
      },
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
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
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }

  formatarRacas(racas?: Raca[]) {
    return racas ? racas.map(r => r.descricao).join(', ') : '-';
  }

  buscarClientesPetsRacas() {
    this.isLoading = true;

    this.service.listarPets().subscribe({
      next: (pets: Pet[]) => this.pets = pets,
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
      complete: () => this.isLoading = false,
    });

    this.service.listarClientes().subscribe({
      next: (clientes: Usuario[]) => this.clientes = clientes,
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
    });

    this.service.listarRacas().subscribe({
      next: (racas: Raca[]) => this.racas = racas,
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
    });
  }

  adicionarClienteContatos(cliente: Usuario, contatos: Contato[]): Contato[] {
    return contatos.map(contato => ({
      ...contato,
      cliente
    }));
  }
  
  adicionarClienteEnderecos(cliente: Usuario, enderecos: Endereco[]): Endereco[] {
    return enderecos.map(endereco => ({
      ...endereco,
      cliente
    }));
  }
}