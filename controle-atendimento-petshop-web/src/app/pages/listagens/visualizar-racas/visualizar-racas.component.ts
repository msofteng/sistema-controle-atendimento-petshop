import { Component, OnInit, inject } from '@angular/core';
import { CadastroRacaComponent } from "../../../shared/components/forms/cadastros/cadastro-raca/cadastro-raca.component";
import { ModalComponent } from "../../../shared/components/page/modal/modal.component";
import { Raca } from '../../../shared/interfaces/petshop.entities';
import { ResponseError } from '../../../shared/interfaces/response';
import { PetshopService } from '../../../shared/services/petshop.service';

import HttpErrorResponse from '../../../core/errors/http-error-response';

@Component({
  selector: 'app-visualizar-racas',
  imports: [
    ModalComponent,
    CadastroRacaComponent
  ],
  templateUrl: './visualizar-racas.component.html',
  styleUrl: './visualizar-racas.component.css'
})
export class VisualizarRacasComponent implements OnInit {
  service: PetshopService = inject(PetshopService);

  racas: Raca[] = [];

  isLoading = false;

  openModalAtualizarRaca = false;

  racaSelecionadoEdicao?: Raca;

  ngOnInit(): void {
    this.buscarRacas();
  }

  racaAdicionada(raca: Raca) {
    this.service.cadastrarRaca(raca).subscribe({
      next: (data: Raca) => {
        this.buscarRacas();

        this.openModalAtualizarRaca = false;
        this.racaSelecionadoEdicao = undefined;
      },
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
    });
  }

  editarRaca(raca: Raca) {
    this.racaSelecionadoEdicao = raca;
    this.openModalAtualizarRaca = true;
  }

  excluirRaca(raca: Raca) {
    this.isLoading = true;

    this.service.excluirRaca(raca).subscribe({
      next: (res: boolean) => this.racas = this.racas.filter(a => a.id !== raca.id),
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }

  buscarRacas() {
    this.isLoading = true;

    this.service.listarRacas().subscribe({
      next: (racas: Raca[]) => this.racas = racas,
      error: (err: HttpErrorResponse<ResponseError>) => console.error(err),
      complete: () => this.isLoading = false,
    });
  }
}