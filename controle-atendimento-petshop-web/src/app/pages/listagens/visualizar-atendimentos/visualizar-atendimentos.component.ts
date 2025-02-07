import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CadastroAtendimentoComponent } from '../../../shared/components/forms/cadastros/cadastro-atendimento/cadastro-atendimento.component';
import { ModalComponent } from '../../../shared/components/page/modal/modal.component';
import { corrigeData } from '../../../shared/functions/date';
import { Atendimento, Usuario, Pet, Raca } from '../../../shared/interfaces/petshop.entities';
import { ResponseError } from '../../../shared/interfaces/response';
import { PetshopService } from '../../../shared/services/petshop.service';

import HttpErrorResponse from '../../../core/errors/http-error-response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visualizar-atendimentos',
  imports: [
    CurrencyPipe,
    DatePipe,
    ModalComponent,
    CadastroAtendimentoComponent
  ],
  templateUrl: './visualizar-atendimentos.component.html',
  styleUrl: './visualizar-atendimentos.component.css'
})
export class VisualizarAtendimentosComponent implements OnInit {
  service: PetshopService = inject(PetshopService);
  toastr: ToastrService = inject(ToastrService);

  atendimentos: Atendimento[] = [];
  clientes: Usuario[] = [];
  pets: Pet[] = [];
  racas: Raca[] = [];

  isLoading = false;
  openModalCriarAtendimento = false;
  openModalAtualizarAtendimento = false;

  atendimentoSelecionadoEdicao?: Atendimento;
  usuarioLogado?: Usuario;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.listarAtendimentosClientesRacasPet();
    this.service.getUsuario().subscribe(usuario => this.usuarioLogado = usuario);
  }

  atendimentoAdicionado(atendimento: Atendimento) {
    if (atendimento.data instanceof Date)
      atendimento.data = corrigeData(atendimento.data).toISOString().split('T')[0];

    if (atendimento.pets.length > 0)
      atendimento.pets = atendimento.pets.map(pet => ({
        ...pet,
        cliente: this.clientes.find(cli => cli.cpf === pet.cliente.cpf) as Usuario
      }));
    
    this.service.cadastrarAtendimento(atendimento).subscribe({
      next: (data: Atendimento) => {
        this.listarAtendimentosClientesRacasPet();

        this.openModalCriarAtendimento = false;
        this.openModalAtualizarAtendimento = false;
        this.pets = [];
        this.atendimentoSelecionadoEdicao = undefined;
      },
      error: (err: HttpErrorResponse<ResponseError>) => this.mostrarErro(err),
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
      dataNascimento: (pet.dataNascimento && pet.dataNascimento instanceof Date) ? (pet.dataNascimento as Date).toISOString().split('T')[0] : '',
      cliente: {
        ...pet.cliente,
        dataCadastro: (pet.cliente && pet.cliente.dataCadastro instanceof Date) ? (pet.cliente.dataCadastro as Date).toISOString().split('T')[0] : ''
      }
    }));

    this.service.excluirAtendimento(atendimento).subscribe({
      next: (res: boolean) => this.atendimentos = this.atendimentos.filter(a => a.id !== atendimento.id),
      error: (err: HttpErrorResponse<ResponseError>) => this.mostrarErro(err),
      complete: () => this.isLoading = false,
    });
  }

  formatarRacas(racas?: Raca[]) {
    return racas ? racas.map(r => r.descricao).join(', ') : '-';
  }

  buscarAnimaisCliente(cliente?: Usuario) {
    if (cliente && cliente.dataCadastro && cliente.dataCadastro instanceof Date)
      cliente.dataCadastro = (cliente.dataCadastro as Date).toISOString().split('T')[0];

    this.isLoading = true;
    this.pets = [];
    if (cliente) {
      this.service.listarPets({ filter: { cliente: cliente } }).subscribe({
        next: (pets: Pet[]) => this.pets = pets,
        error: (err: HttpErrorResponse<ResponseError>) => this.mostrarErro(err),
        complete: () => this.isLoading = false,
      });
    }
  }

  listarAtendimentosClientesRacasPet() {
    this.isLoading = true;

    this.service.listarAtendimentos().subscribe({
      next: (atendimentos: Atendimento[]) => this.atendimentos = atendimentos,
      error: (err: HttpErrorResponse<ResponseError>) => this.mostrarErro(err),
      complete: () => this.isLoading = false,
    });

    this.service.listarClientes().subscribe({
      next: (clientes: Usuario[]) => this.clientes = clientes,
      error: (err: HttpErrorResponse<ResponseError>) => this.mostrarErro(err),
      complete: () => {},
    });

    this.service.listarRacas().subscribe({
      next: (racas: Raca[]) => this.racas = racas,
      error: (err: HttpErrorResponse<ResponseError>) => this.mostrarErro(err),
      complete: () => {},
    });
  }

  mostrarErro(err: HttpErrorResponse<ResponseError>) {
    this.toastr.error(`
      <details>
        <summary>Erro: ${err.error.message}</summary>
        ${err.error.detail}
      </details>
    `);
  }
}