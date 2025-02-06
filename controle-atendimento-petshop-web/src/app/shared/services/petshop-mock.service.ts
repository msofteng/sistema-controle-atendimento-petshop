import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { corrigeData } from '../functions/date';
import { Atendimento, Pet, Raca, Usuario } from '../interfaces/petshop.entities';
import { LoginParams, PageParams } from '../interfaces/request';

import atendimentos from '../../data/mocks/atendimentos.json';
import pets from '../../data/mocks/pets.json';
import racas from '../../data/mocks/racas.json';

@Injectable({
  providedIn: 'root'
})
export class PetshopMockService {
  seconds = 0;

  login(data: LoginParams): Observable<Usuario> {
    return of({
      id: 0,
      nome: `${data.nomeCpf}`,
      perfil: 'cliente',
      password: '',
      dataCadastro: '2025-01-01'
    }).pipe(delay(this.seconds));
  }

  cadastrarFuncionario(usuario: Usuario): Observable<Usuario> {
    return of(usuario).pipe(delay(this.seconds));
  }

  cadastrarCliente(cliente: Usuario): Observable<Usuario> {
    return of(cliente).pipe(delay(this.seconds));
  }

  cadastrarAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return of(atendimento).pipe(delay(this.seconds));
  }

  cadastrarPet(pet: Pet): Observable<Pet> {
    return of(pet).pipe(delay(this.seconds));
  }

  cadastrarRaca(raca: Raca): Observable<Raca> {
    return of(raca).pipe(delay(this.seconds));
  }

  excluirFuncionario(usuario: Usuario): Observable<boolean> {
    return of(true);
  }

  excluirCliente(cliente: Usuario): Observable<boolean> {
    return of(true);
  }

  excluirAtendimento(atendimento: Atendimento): Observable<boolean> {
    return of(true);
  }

  excluirPet(pet: Pet): Observable<boolean> {
    return of(true);
  }

  excluirRaca(raca: Raca): Observable<boolean> {
    return of(true);
  }

  listarClientes(filters: PageParams<Usuario>): Observable<Usuario[]> {
    return of([]).pipe(delay(this.seconds));
  }

  listarAtendimentos(filters: PageParams<Atendimento>): Observable<Atendimento[]> {
    return of(
      Array.from({ length: 1 }).map((_, index) => (
        {
          ...atendimentos[0],
          id: (index + 1),
          data: corrigeData(new Date(atendimentos[0].data)),
          pets: atendimentos[0].pets.map<Pet>(pet => ({
            ...pet,
            dataNascimento: corrigeData(new Date(pet.dataNascimento))
          }))
        }
      ))
    ).pipe(delay(this.seconds));
  }

  listarPets(filters: PageParams<Pet>): Observable<Pet[]> {
    return of(
      Array.from({ length: 1 }).map((_, index) => (
        {
          ...pets[0],
          id: (index + 1),
          dataNascimento: corrigeData(new Date(pets[0].dataNascimento))
        }
      ))
    ).pipe(delay(this.seconds));
  }

  listarRacas(filters: PageParams<Raca>): Observable<Raca[]> {
    return of(racas).pipe(delay(this.seconds));
  }
}