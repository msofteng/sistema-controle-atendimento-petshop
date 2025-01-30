export interface PageParams<T> {
  page?: number;
  qtd?: number;
  filter?: Partial<T>;
}