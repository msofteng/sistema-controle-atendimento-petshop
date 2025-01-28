import { Component, OnInit, inject } from '@angular/core';
import { PetshopService } from '../../../shared/services/petshop.service';
import { Atendimento, Raca } from '../../../shared/interfaces/petshop.entities';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-visualizar-atendimentos',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './visualizar-atendimentos.component.html',
  styleUrl: './visualizar-atendimentos.component.css'
})
export class VisualizarAtendimentosComponent implements OnInit {
  service: PetshopService = inject(PetshopService);

  atendimentos: Atendimento[] = [];

  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;

    this.service.listarAtendimentos({ qtd: 10, page: 1 }).subscribe({
      next: (atendimentos: Atendimento[]) => this.atendimentos = atendimentos,
      error: (err: HttpErrorResponse) => console.log(err),
      complete: () => this.isLoading = false,
    })
  }

  formatarRacas(racas: Raca[]) {
    return racas.map(r => r.descricao).join(', ');
  }
}
