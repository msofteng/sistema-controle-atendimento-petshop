import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Perfil } from '../enums/perfil';
import { corrigeData } from '../functions/date';
import { LoginParams } from '../interfaces/login-params';
import { PageParams } from '../interfaces/page-params';
import { Atendimento, Cliente, Contato, Endereco, Pet, Raca, Usuario } from '../interfaces/petshop.entities';
import { changePerfil, changeTipoContato } from '../utils/change-enum';

@Injectable({
  providedIn: 'root'
})
export class PetshopService {
  private http = inject(HttpClient);

  login(data: LoginParams): Observable<Usuario> {
    // implementar o login com JWT aqui
    return this.http.post<Usuario>('/NOT_IMPLEMENTED', data);
  }

  cadastrarFuncionario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('/funcionario/salvar', usuario).pipe(
      map(response => ({
        ...response,
        perfil: Perfil.ADMIN
      }))
    );
  }

  cadastrarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>('/cliente/salvar', cliente).pipe(
      map(response => ({
        ...response,
        perfil: changePerfil(response.perfil),
        dataCadastro: corrigeData(new Date(response.dataCadastro)),
        contatos: response.contatos ? response.contatos.map<Contato>(contato => ({
          ...contato,
          tipo: changeTipoContato(contato.tipo)
        })) : []
      }))
    );
  }

  cadastrarAtendimento(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>('/atendimento/salvar', atendimento).pipe(
      map(response => ({
        ...response,
        data: corrigeData(new Date(response.data)),
        pets: response.pets.map<Pet>(pet => ({
          ...pet,
          dataNascimento: corrigeData(new Date(pet.dataNascimento))
        }))
      }))
    );
  }

  cadastrarPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>('/pet/salvar', pet).pipe(
      map(response => ({
        ...response,
        dataNascimento: corrigeData(new Date(response.dataNascimento))
      }))
    );
  }

  cadastrarRaca(raca: Raca): Observable<Raca> {
    return this.http.post<Raca>('/raca/salvar', raca);
  }

  excluirFuncionario(usuario: Usuario): Observable<boolean> {
    return this.http.delete<boolean>('/funcionario/excluir', { body: usuario, observe: 'response' }).pipe(
      catchError(error => throwError(() => error)),
      map(response => response.status === 204)
    );
  }

  excluirCliente(cliente: Cliente): Observable<boolean> {
    return this.http.delete<boolean>('/cliente/excluir', { body: cliente, observe: 'response' }).pipe(
      catchError(error => throwError(() => error)),
      map(response => response.status === 204)
    );
  }

  excluirEndereco(endereco: Endereco): Observable<boolean> {
    return this.http.delete<boolean>('/cliente/endereco/excluir', { body: endereco, observe: 'response' }).pipe(
      catchError(error => throwError(() => error)),
      map(response => response.status === 204)
    );
  }

  excluirContato(contato: Contato): Observable<boolean> {
    return this.http.delete<boolean>('/cliente/contato/excluir', { body: contato, observe: 'response' }).pipe(
      catchError(error => throwError(() => error)),
      map(response => response.status === 204)
    );
  }

  excluirAtendimento(atendimento: Atendimento): Observable<boolean> {
    return this.http.delete<boolean>('/atendimento/excluir', { body: atendimento, observe: 'response' }).pipe(
      catchError(error => throwError(() => error)),
      map(response => response.status === 204)
    );
  }

  excluirPet(pet: Pet): Observable<boolean> {
    return this.http.delete<boolean>('/pet/excluir', { body: pet, observe: 'response' }).pipe(
      catchError(error => throwError(() => error)),
      map(response => response.status === 204)
    );
  }

  excluirRaca(raca: Raca): Observable<boolean> {
    return this.http.delete<boolean>('/raca/excluir', { body: raca, observe: 'response' }).pipe(
      catchError(error => throwError(() => error)),
      map(response => response.status === 204)
    );
  }

  listarClientes(filters: PageParams<Cliente>): Observable<Cliente[]> {
    return this.http.post<Cliente[]>('/cliente/listar', filters).pipe(
      map(response => response.map(res => ({
        ...res,
        perfil: changePerfil(res.perfil),
        dataCadastro: corrigeData(new Date(res.dataCadastro)),
        contatos: res.contatos ? res.contatos.map<Contato>(contato => ({
          ...contato,
          tipo: changeTipoContato(contato.tipo)
        })) : []
      })))
    );
  }

  listarAtendimentos(filters: PageParams<Atendimento>): Observable<Atendimento[]> {
    return this.http.post<Atendimento[]>('/atendimento/listar', filters).pipe(
      map(response => response.map(res => ({
        ...res,
        pets: res.pets ? res.pets.map<Pet>(pet => ({
          ...pet,
          dataNascimento: corrigeData(new Date(pet.dataNascimento)),
          cliente: {
            ...pet.cliente,
            dataCadastro: corrigeData(new Date(pet.cliente.dataCadastro)),
            contatos: pet.cliente.contatos ? pet.cliente.contatos.map<Contato>(contato => ({
              ...contato,
              tipo: changeTipoContato(contato.tipo)
            })) : []
          }
        })) : []
      })))
    );
  }

  listarPets(filters: PageParams<Pet>): Observable<Pet[]> {
    return this.http.post<Pet[]>('/pet/listar', filters).pipe(
      map(response => response.map(res => ({
        ...res,
        dataNascimento: corrigeData(new Date(res.dataNascimento)),
      })))
    );
  }

  listarRacas(filters: PageParams<Raca>): Observable<Raca[]> {
    return this.http.post<Raca[]>('/raca/listar', filters);
  }
}