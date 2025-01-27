import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageParams } from '../interfaces/page-params';
import { TipoContato } from '../enums/tipo-contato';
import { Atendimento, Cliente, Contato, Pet, Raca, Usuario } from '../interfaces/petshop.entities';

import atendimentos from '../../data/mocks/atendimentos.json';
import clientes from '../../data/mocks/clientes.json';
import pets from '../../data/mocks/pets.json';
import racas from '../../data/mocks/racas.json';

@Injectable({
  providedIn: 'root'
})
export class PetshopService {
  // constructor() {}

  cadastrarFuncionario(usuario: Usuario): Observable<Usuario> {
    return of(usuario);
  }

  cadastrarCliente(cliente: Cliente): Observable<Cliente> {
    return of(cliente);
  }

  cadastrarAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return of(atendimento);
  }

  atualizarFuncionario(usuario: Usuario): Observable<Usuario> {
    return of(usuario);
  }

  atualizarCliente(cliente: Cliente): Observable<Cliente> {
    return of(cliente);
  }

  atualizarAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return of(atendimento);
  }

  excluirFuncionario(usuario: Usuario): void {
    console.log(usuario);
  }

  excluirCliente(cliente: Cliente): void {
    console.log(cliente);
  }

  excluirAtendimento(atendimento: Atendimento): void {
    console.log(atendimento);
  }

  listarClientes(filter: Cliente, pagination: PageParams): Observable<Cliente[]> {
    return of(clientes.map<Cliente>(cliente => ({
      ...cliente,
      dataCadastro: new Date(cliente.dataCadastro),
      contatos: cliente.contatos.map<Contato>(contato => ({
        ...contato,
        tipo: (contato.tipo === 'e-mail') ? TipoContato.EMAIL : TipoContato.TELEFONE
      }))
    })));
  }

  listarAtendimentos(filter: Atendimento, pagination: PageParams): Observable<Atendimento[]> {
    return of(atendimentos.map<Atendimento>(atendimento => ({
      ...atendimento,
      data: new Date(atendimento.data),
      pet: {
        ...atendimento.pet,
        dataNascimento: new Date(atendimento.pet.dataNascimento)
      }
    })));
  }

  listarPets(filter: Pet, pagination: PageParams): Observable<Pet[]> {
    return of(pets.map<Pet>(pet => ({
      ...pet,
      dataNascimento: new Date(pet.dataNascimento)
    })));
  }

  listarRacas(filter: Raca, pagination: PageParams): Observable<Raca[]> {
    return of(racas);
  }
}