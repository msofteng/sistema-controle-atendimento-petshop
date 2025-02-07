import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Perfil } from '../enums/perfil';
import { corrigeData } from '../functions/date';
import { LoginResponse } from '../interfaces/login-response';
import { Atendimento, Contato, Endereco, Pet, Raca, Usuario } from '../interfaces/petshop.entities';
import { LoginParams, PageParams } from '../interfaces/request';
import { changePerfil, changeTipoContato } from '../utils/change-enum';

@Injectable({
  providedIn: 'root'
})
export class PetshopService {
  private http = inject(HttpClient);
  private usuario: BehaviorSubject<Usuario | undefined> = new BehaviorSubject<Usuario | undefined>(undefined);

  login(data: LoginParams): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/auth/login', data);
  }

  getUsuarioLogado(): Observable<Usuario> {
    return this.http.get<Usuario>('/auth/me');
  }

  cadastrarFuncionario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('/auth/signup', usuario).pipe(
      map(response => ({
        ...response,
        perfil: Perfil.ADMIN
      }))
    );
  }

  cadastrarCliente(cliente: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('/usuario/salvar', cliente).pipe(
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

  excluirCliente(cliente: Usuario): Observable<boolean> {
    return this.http.delete<boolean>('/usuario/excluir', { body: cliente, observe: 'response' }).pipe(
      catchError(error => throwError(() => error)),
      map(response => response.status === 204)
    );
  }

  excluirEndereco(endereco: Endereco): Observable<boolean> {
    return this.http.delete<boolean>('/usuario/endereco/excluir', { body: endereco, observe: 'response' }).pipe(
      catchError(error => throwError(() => error)),
      map(response => response.status === 204)
    );
  }

  excluirContato(contato: Contato): Observable<boolean> {
    return this.http.delete<boolean>('/usuario/contato/excluir', { body: contato, observe: 'response' }).pipe(
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

  listarClientes(filters?: PageParams<Usuario>): Observable<Usuario[]> {
    return this.http.post<Usuario[]>('/usuario/listar', filters).pipe(
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

  listarAtendimentos(filters?: PageParams<Atendimento>): Observable<Atendimento[]> {
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

  listarPets(filters?: PageParams<Pet>): Observable<Pet[]> {
    return this.http.post<Pet[]>('/pet/listar', filters).pipe(
      map(response => response.map(res => ({
        ...res,
        dataNascimento: corrigeData(new Date(res.dataNascimento)),
      })))
    );
  }

  listarRacas(filters?: PageParams<Raca>): Observable<Raca[]> {
    return this.http.post<Raca[]>('/raca/listar', filters);
  }

  getUsuario(): Observable<Usuario | undefined> {
    return this.usuario.asObservable();
  }

  setUsuario(value: Usuario | undefined) {
    this.usuario.next(value);
  }
}