import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { CadastroAtendimentoComponent } from '../../../shared/components/forms/cadastros/cadastro-atendimento/cadastro-atendimento.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { Atendimento, Cliente, Pet, Raca } from '../../../shared/interfaces/petshop.entities';
import { PetshopService } from '../../../shared/services/petshop.service';

@Component({
  selector: 'app-visualizar-atendimentos',
  imports: [
    CurrencyPipe,
    ModalComponent,
    CadastroAtendimentoComponent
  ],
  templateUrl: './visualizar-atendimentos.component.html',
  styleUrl: './visualizar-atendimentos.component.css'
})
export class VisualizarAtendimentosComponent implements OnInit {
  service: PetshopService = inject(PetshopService);

  atendimentos: Atendimento[] = [];
  clientes: Cliente[] = [];
  pets: Pet[] = [];
  racas: Raca[] = [];

  isLoading = false;
  openModalCriarAtendimento = false;
  openModalAtualizarAtendimento = false;

  atendimentoSelecionadoEdicao?: Atendimento;

  ngOnInit(): void {
    this.isLoading = true;

    this.service.listarAtendimentos({ qtd: 10, page: 1 }).subscribe({
      next: (atendimentos: Atendimento[]) => this.atendimentos = atendimentos,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });

    this.service.listarClientes({ qtd: 10, page: 1 }).subscribe({
      next: (clientes: Cliente[]) => this.clientes = clientes,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });

    this.service.listarRacas({ qtd: 10, page: 1 }).subscribe({
      next: (racas: Raca[]) => this.racas = racas,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }

  atendimentoAdicionado(atendimento: Atendimento) {
    this.service.cadastrarAtendimento(atendimento).subscribe({
      next: (data: Atendimento) => console.log('sucesso'),
      error: (err: HttpErrorResponse) => console.error(err),
    });

    this.isLoading = true;

    this.service.listarAtendimentos({ qtd: 10, page: 1 }).subscribe({
      next: (atendimentos: Atendimento[]) => this.atendimentos = atendimentos,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });

    this.openModalCriarAtendimento = false;
    this.openModalAtualizarAtendimento = false;
    this.pets = [];
    this.atendimentoSelecionadoEdicao = undefined;
  }

  editarAtendimento(atendimento: Atendimento) {
    this.atendimentoSelecionadoEdicao = atendimento;
    this.openModalAtualizarAtendimento = true;
  }

  excluirAtendimento(atendimento: Atendimento) {
    this.isLoading = true;

    this.service.excluirAtendimento(atendimento).subscribe({
      next: (res: boolean) => this.atendimentos = this.atendimentos.filter(a => a.id !== atendimento.id),
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }

  formatarRacas(racas: Raca[]) {
    return racas.map(r => r.descricao).join(', ');
  }

  buscarAnimaisCliente(cliente?: Cliente) {
    this.pets = [];
    if (cliente) {
      this.service.listarPets({ qtd: 10, page: 1, filter: { cliente: cliente } }).subscribe({
        next: (pets: Pet[]) => this.pets = pets,
        error: (err: HttpErrorResponse) => console.error(err),
        complete: () => this.isLoading = false,
      });
    }
  }
}