import { Component, OnInit, inject } from '@angular/core';
import { CadastroClienteComponent } from "../../../shared/components/forms/cadastros/cadastro-cliente/cadastro-cliente.component";
import { ModalComponent } from "../../../shared/components/page/modal/modal.component";
import { Usuario } from '../../../shared/interfaces/petshop.entities';
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

  clientes: Usuario[] = [];

  isLoading = false;
  openModalAtualizarCliente = false;

  clienteSelecionadoEdicao?: Usuario;
  usuarioLogado?: Usuario;

  ngOnInit(): void {
    this.buscarClientes();
    this.service.getUsuario().subscribe(usuario => this.usuarioLogado = usuario);
  }

  clienteAdicionado(cliente: Usuario) {
    if (cliente.dataCadastro instanceof Date)
      cliente.dataCadastro = (cliente.dataCadastro as Date).toISOString().split('T')[0];
    
    this.service.cadastrarCliente(cliente).subscribe({
      next: (data: Usuario) => {
        this.buscarClientes();

        this.openModalAtualizarCliente = false;
        this.clienteSelecionadoEdicao = undefined;
      },
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
    });
  }

  editarCliente(cliente: Usuario) {
    this.clienteSelecionadoEdicao = cliente;
    this.openModalAtualizarCliente = true;
  }

  excluirCliente(cliente: Usuario) {
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
      next: (clientes: Usuario[]) => this.clientes = clientes,
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
      complete: () => this.isLoading = false,
    })
  }
}