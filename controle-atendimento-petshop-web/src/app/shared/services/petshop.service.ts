import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { PageParams } from '../interfaces/page-params';
import { TipoContato } from '../enums/tipo-contato';
import { Atendimento, Cliente, Contato, Pet, Raca, Usuario } from '../interfaces/petshop.entities';

import atendimentos from '../../data/mocks/atendimentos.json';
import clientes from '../../data/mocks/clientes.json';
import pets from '../../data/mocks/pets.json';
import racas from '../../data/mocks/racas.json';
import { LoginParams } from '../interfaces/login-params';

@Injectable({
  providedIn: 'root'
})
export class PetshopService {
  seconds = 5000;
  // constructor() {}

  login(data: LoginParams): Observable<Usuario> {
    let usuario = clientes[0];
    return of({
      ...usuario,
      dataCadastro: new Date(usuario.dataCadastro),
      contatos: usuario.contatos.map<Contato>(contato => ({
        ...contato,
        tipo: (contato.tipo === 'e-mail') ? TipoContato.EMAIL : TipoContato.TELEFONE
      }))
    }).pipe(delay(this.seconds));
  }

  cadastrarFuncionario(usuario: Usuario): Observable<Usuario> {
    return of(usuario).pipe(delay(this.seconds));
  }

  cadastrarCliente(cliente: Cliente): Observable<Cliente> {
    return of(cliente).pipe(delay(this.seconds));
  }

  cadastrarAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return of(atendimento).pipe(delay(this.seconds));
  }

  atualizarFuncionario(usuario: Usuario): Observable<Usuario> {
    return of(usuario).pipe(delay(this.seconds));
  }

  atualizarCliente(cliente: Cliente): Observable<Cliente> {
    return of(cliente).pipe(delay(this.seconds));
  }

  atualizarAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return of(atendimento).pipe(delay(this.seconds));
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

  listarClientes(filters: PageParams<Cliente>): Observable<Cliente[]> {
    return of(clientes.map<Cliente>(cliente => ({
      ...cliente,
      dataCadastro: new Date(cliente.dataCadastro),
      contatos: cliente.contatos.map<Contato>(contato => ({
        ...contato,
        tipo: (contato.tipo === 'e-mail') ? TipoContato.EMAIL : TipoContato.TELEFONE
      }))
    }))).pipe(delay(this.seconds));
  }

  listarAtendimentos(filters: PageParams<Atendimento>): Observable<Atendimento[]> {
    return of(atendimentos.map<Atendimento>(atendimento => ({
      ...atendimento,
      data: new Date(atendimento.data),
      pet: {
        ...atendimento.pet,
        dataNascimento: new Date(atendimento.pet.dataNascimento)
      }
    }))).pipe(delay(this.seconds));
  }

  listarPets(filters: PageParams<Pet>): Observable<Pet[]> {
    return of(pets.map<Pet>(pet => ({
      ...pet,
      dataNascimento: new Date(pet.dataNascimento)
    }))).pipe(delay(this.seconds));
  }

  listarRacas(filters: PageParams<Raca>): Observable<Raca[]> {
    return of(racas).pipe(delay(this.seconds));
  }
}