import { Injectable } from '@angular/core';
import { TipoContato } from '../enums/tipo-contato';
import { PageParams } from '../interfaces/page-params';
import { Perfil } from '../enums/perfil';
import { corrigeData } from '../functions/date';
import { LoginParams } from '../interfaces/login-params';
import { Observable, delay, of } from 'rxjs';
import { Atendimento, Cliente, Contato, Pet, Raca, Usuario } from '../interfaces/petshop.entities';
import atendimentos from '../../data/mocks/atendimentos.json';
import clientes from '../../data/mocks/clientes.json';
import pets from '../../data/mocks/pets.json';
import racas from '../../data/mocks/racas.json';

@Injectable({
  providedIn: 'root'
})
export class PetshopService {
  seconds = 5000;

  login(data: LoginParams): Observable<Usuario> {
    let usuario = clientes[0];
    return of({
      ...usuario,
      perfil: (usuario.perfil === 'cliente') ? Perfil.CLIENTE : Perfil.ADMIN,
      dataCadastro: corrigeData(new Date(usuario.dataCadastro)),
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

  excluirFuncionario(usuario: Usuario): Observable<boolean> {
    return of(true);
  }

  excluirCliente(cliente: Cliente): Observable<boolean> {
    return of(true);
  }

  excluirAtendimento(atendimento: Atendimento): Observable<boolean> {
    return of(true);
  }

  listarClientes(filters: PageParams<Cliente>): Observable<Cliente[]> {
    return of(
      Array.from({ length: 1 }).map((_, index) => (
        {
          ...clientes[0],
          id: (index + 1),
          perfil: (clientes[0].perfil === 'cliente') ? Perfil.CLIENTE : Perfil.ADMIN,
          dataCadastro: corrigeData(new Date(clientes[0].dataCadastro)),
          contatos: clientes[0].contatos.map<Contato>(contato => ({
            ...contato,
            tipo: (contato.tipo === 'e-mail') ? TipoContato.EMAIL : TipoContato.TELEFONE
          }))
        }
      ))
    ).pipe(delay(this.seconds));
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