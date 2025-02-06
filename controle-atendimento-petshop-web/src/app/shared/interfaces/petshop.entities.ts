import { Perfil } from "../enums/perfil";
import { TipoContato } from "../enums/tipo-contato";

export interface Endereco {
  id: number;
  logradouro: string;
  cidade: string;
  bairro: string;
  tag?: string;
  complemento?: string;
  cliente?: Usuario;
}

export interface Contato {
  id: number;
  tag: string;
  tipo: TipoContato | string;
  valor: string;
  cliente?: Usuario;
}

export interface Usuario {
  id: number;
  nome: string;
  cpf?: string;
  perfil: Perfil | string;
  password: string;
  foto?: string;
  dataCadastro: Date | string;
  contatos?: Contato[];
  enderecos?: Endereco[];
  pets?: Pet[];
}

export interface Raca {
  id: number;
  descricao: string;
}

export interface Pet {
  id: number;
  nome: string;
  dataNascimento: Date | string;
  cliente: Usuario;
  raca: Raca[];
  foto?: string;
}

export interface Atendimento {
  id: number;
  descricao: string;
  valor: number;
  data: Date | string;
  pets: Pet[];
}