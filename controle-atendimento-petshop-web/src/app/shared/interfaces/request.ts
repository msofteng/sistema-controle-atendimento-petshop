export interface LoginParams {
  nomeCpf: string;
  password: string;
}

export interface PageParams<T> {
  page?: number;
  qtd?: number;
  filter?: Partial<T>;
}