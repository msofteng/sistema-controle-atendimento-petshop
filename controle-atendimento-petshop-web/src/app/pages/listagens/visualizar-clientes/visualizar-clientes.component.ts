import { Component, OnInit, inject } from '@angular/core';
import { PetshopService } from '../../../shared/services/petshop.service';
import { Cliente } from '../../../shared/interfaces/petshop.entities';
import { HttpErrorResponse } from '@angular/common/http';
import { CpfPipe } from '../../../shared/pipes/cpf.pipe';

@Component({
  selector: 'app-visualizar-clientes',
  imports: [
    CpfPipe
  ],
  templateUrl: './visualizar-clientes.component.html',
  styleUrl: './visualizar-clientes.component.css'
})
export class VisualizarClientesComponent implements OnInit {
  service: PetshopService = inject(PetshopService);

  clientes: Cliente[] = [];

  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;

    this.service.listarClientes({ qtd: 10, page: 1 }).subscribe({
      next: (clientes: Cliente[]) => this.clientes = clientes,
      error: (err: HttpErrorResponse) => console.log(err),
      complete: () => this.isLoading = false,
    })
  }
}
