import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { CadastroClienteComponent } from "../../../shared/components/forms/cadastros/cadastro-cliente/cadastro-cliente.component";
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { Cliente } from '../../../shared/interfaces/petshop.entities';
import { CpfPipe } from '../../../shared/pipes/cpf.pipe';
import { PetshopService } from '../../../shared/services/petshop.service';

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
    this.isLoading = true;

    this.service.listarClientes({ qtd: 10, page: 1 }).subscribe({
      next: (clientes: Cliente[]) => this.clientes = clientes,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    })
  }

  clienteAdicionado(cliente: Cliente) {
    this.service.cadastrarCliente(cliente).subscribe({
      next: (data: Cliente) => console.log('sucesso'),
      error: (err: HttpErrorResponse) => console.error(err),
    });

    this.isLoading = true;

    this.service.listarClientes({ qtd: 10, page: 1 }).subscribe({
      next: (clientes: Cliente[]) => this.clientes = clientes,
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });

    this.openModalAtualizarCliente = false;
    this.clienteSelecionadoEdicao = undefined;
  }

  editarCliente(cliente: Cliente) {
    this.clienteSelecionadoEdicao = cliente;
    this.openModalAtualizarCliente = true;
  }

  excluirCliente(cliente: Cliente) {
    this.isLoading = true;

    this.service.excluirCliente(cliente).subscribe({
      next: (res: boolean) => this.clientes = this.clientes.filter(a => a.id !== cliente.id),
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }
}