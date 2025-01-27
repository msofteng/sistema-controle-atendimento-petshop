import { Perfil } from "../enums/perfil";
import { TipoContato } from "../enums/tipo-contato";

export interface Endereco {
    id: number;
    logradouro: string;
    cidade: string;
    bairro: string;
    complemento: string;
    tag: string;
    cliente?: Cliente;
}

export interface Contato {
    id: number;
    tag: string;
    tipo: TipoContato | string;
    valor: string;
    cliente?: Cliente;
}

export interface Usuario {
    id: number;
    nome: string;
    cpf?: number;
    perfil: Perfil | string;
    senha: string;
}

export interface Cliente extends Usuario {
    dataCadastro: Date | string;
    contatos: Contato[];
    enderecos: Endereco[];
}

export interface Raca {
    id: number;
    descricao: string;
}

export interface Pet {
    id: number;
    nome: string;
    dataNascimento: Date | string;
    cliente: Cliente;
    raca: Raca;
}

export interface Atendimento {
    id: number;
    descricao: string;
    valor: number;
    data: Date | string;
    pet: Pet;
}