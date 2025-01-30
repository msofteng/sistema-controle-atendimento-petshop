import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {
  transform(value: number | undefined): string {
    let strValue = value?.toString();

    if (!strValue) return '';

    strValue = strValue.replace(/\D/g, '');

    if (strValue.length !== 11) return value?.toString() ?? '';

    return strValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}