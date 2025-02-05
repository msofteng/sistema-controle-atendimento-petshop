import { Component, OnInit, inject } from '@angular/core';
import { CadastroClienteComponent } from "../../../shared/components/forms/cadastros/cadastro-cliente/cadastro-cliente.component";
import { ModalComponent } from "../../../shared/components/page/modal/modal.component";
import { Cliente } from '../../../shared/interfaces/petshop.entities';
import { ResponseError } from '../../../shared/interfaces/response';
import { CpfPipe } from '../../../shared/pipes/cpf.pipe';
import { PetshopService } from '../../../shared/services/petshop.service';

import HttpErrorResponse from '../../../core/errors/http-error-response';

@Component({
  selector: 'app-visualizar-clientes',
  imports: [
    CpfPipe,
    ModalComponent,
    CadastroClienteComponent
  ],
  templateUrl: './visualizar-clientes.component.html',
  styleUrl: './visualizar-clientes.component.css'
})
export class VisualizarClientesComponent implements OnInit {
  service: PetshopService = inject(PetshopService);

  clientes: Cliente[] = [];

  isLoading = false;
  openModalAtualizarCliente = false;

  clienteSelecionadoEdicao?: Cliente;

  ngOnInit(): void {
    this.buscarClientes();
  }

  clienteAdicionado(cliente: Cliente) {
    this.service.cadastrarCliente(cliente).subscribe({
      next: (data: Cliente) => {
        this.buscarClientes();

        this.openModalAtualizarCliente = false;
        this.clienteSelecionadoEdicao = undefined;
      },
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
    });
  }

  editarCliente(cliente: Cliente) {
    this.clienteSelecionadoEdicao = cliente;
    this.openModalAtualizarCliente = true;
  }

  excluirCliente(cliente: Cliente) {
    this.isLoading = true;

    if (cliente.dataCadastro instanceof Date)
      cliente.dataCadastro = (cliente.dataCadastro as Date).toISOString().split('T')[0];

    this.service.excluirCliente(cliente).subscribe({
      next: (res: boolean) => this.clientes = this.clientes.filter(a => a.id !== cliente.id),
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }

  buscarClientes() {
    this.isLoading = true;

    this.service.listarClientes().subscribe({
      next: (clientes: Cliente[]) => this.clientes = clientes,
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
      complete: () => this.isLoading = false,
    })
  }
}