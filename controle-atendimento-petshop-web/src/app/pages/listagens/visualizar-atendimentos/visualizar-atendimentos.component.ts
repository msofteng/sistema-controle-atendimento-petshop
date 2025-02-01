import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CadastroAtendimentoComponent } from '../../../shared/components/forms/cadastros/cadastro-atendimento/cadastro-atendimento.component';
import { ModalComponent } from '../../../shared/components/page/modal/modal.component';
import { corrigeData } from '../../../shared/functions/date';
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

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.service.listarAtendimentos({ qtd: 0, page: 0 }).subscribe({
      next: (atendimentos: Atendimento[]) => this.atendimentos = atendimentos,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });

    this.service.listarClientes({ qtd: 0, page: 0 }).subscribe({
      next: (clientes: Cliente[]) => this.clientes = clientes,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });

    this.service.listarRacas({ qtd: 0, page: 0 }).subscribe({
      next: (racas: Raca[]) => this.racas = racas,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }

  atendimentoAdicionado(atendimento: Atendimento) {
    if (atendimento.data instanceof Date)
      atendimento.data = corrigeData(atendimento.data).toISOString().split('T')[0];

    if (atendimento.pets.length > 0)
      atendimento.pets = atendimento.pets.map(pet => ({ ...pet, cliente: this.clientes.find(cli => cli.cpf === pet.cliente.cpf) as Cliente }));
    
    this.service.cadastrarAtendimento(atendimento).subscribe({
      next: (data: Atendimento) => {
        this.isLoading = true;

        this.service.listarAtendimentos({ qtd: 0, page: 0 }).subscribe({
          next: (atendimentos: Atendimento[]) => this.atendimentos = atendimentos,
          error: (err: HttpErrorResponse) => console.error(err),
          complete: () => this.isLoading = false,
        });

        this.openModalCriarAtendimento = false;
        this.openModalAtualizarAtendimento = false;
        this.pets = [];
        this.atendimentoSelecionadoEdicao = undefined;
      },
      error: (err: HttpErrorResponse) => console.error(err),
    });
  }

  editarAtendimento(atendimento: Atendimento) {
    this.atendimentoSelecionadoEdicao = atendimento;
    this.openModalAtualizarAtendimento = true;
    this.cdr.detectChanges();
  }

  excluirAtendimento(atendimento: Atendimento) {
    this.isLoading = true;

    atendimento.pets = atendimento.pets.map((pet) => ({ 
      ...pet,
      dataNascimento: (pet.dataNascimento as Date).toISOString().split('T')[0],
      cliente: {
        ...pet.cliente,
        dataCadastro: (pet.cliente.dataCadastro as Date).toISOString().split('T')[0]
      }
    }));

    this.service.excluirAtendimento(atendimento).subscribe({
      next: (res: boolean) => this.atendimentos = this.atendimentos.filter(a => a.id !== atendimento.id),
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }

  formatarRacas(racas?: Raca[]) {
    return racas ? racas.map(r => r.descricao).join(', ') : '-';
  }

  buscarAnimaisCliente(cliente?: Cliente) {
    if (cliente && cliente.dataCadastro && cliente.dataCadastro instanceof Date)
      cliente.dataCadastro = (cliente.dataCadastro as Date).toISOString().split('T')[0];

    this.isLoading = true;
    this.pets = [];
    if (cliente) {
      this.service.listarPets({ qtd: 0, page: 0, filter: { cliente: cliente } }).subscribe({
        next: (pets: Pet[]) => this.pets = pets,
        error: (err: HttpErrorResponse) => console.error(err),
        complete: () => this.isLoading = false,
      });
    }
  }
}