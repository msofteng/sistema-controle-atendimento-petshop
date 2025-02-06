import { Perfil } from "../enums/perfil";
import { TipoContato } from "../enums/tipo-contato";

export function changePerfil(perfil: string) {
  return perfil == 'ADMINISTRADOR' ? Perfil.ADMIN : Perfil.CLIENTE;
}

export function changeTipoContato(tipo: string) {
  switch (tipo) {
    case 'e-mail':
      return TipoContato.EMAIL
    case 'telefone':
      return TipoContato.TELEFONE
    default:
      return TipoContato.EMAIL;
  }
}