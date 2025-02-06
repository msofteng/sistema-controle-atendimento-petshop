import { CpfPipe } from './cpf.pipe';

describe('CpfPipe', () => {
  let pipe = new CpfPipe();

  beforeEach(() => {
    pipe = new CpfPipe();
  });

  it('criar uma instância', () => {
    expect(pipe).toBeTruthy();
  });

  it('deve formatar um número de CPF válido', () => {
    const resultado = pipe.transform('12345678901');
    expect(resultado).toBe('123.456.789-01');
  });

  it('deve retornar vazio se o valor for undefined', () => {
    const resultado = pipe.transform(undefined);
    expect(resultado).toBe('');
  });

  it('deve retornar o mesmo número como string se não tiver 11 dígitos', () => {
    const resultado1 = pipe.transform('123');
    expect(resultado1).toBe('123');

    const resultado2 = pipe.transform('123456789012');
    expect(resultado2).toBe('123456789012');
  });

  it('deve remover caracteres não numéricos e formatar corretamente', () => {
    const resultado = pipe.transform('123.456.789-01');
    expect(resultado).toEqual('123.456.789-01');
  });

  it('deve retornar o mesmo valor como string se não for um CPF válido após a remoção de caracteres', () => {
    const resultado = pipe.transform('123.45a.bcd');
    expect(resultado).toEqual('123.45a.bcd');
  });

  it('testando valor maior do que os digitos do cpf', () => {
    const resultado = pipe.transform('111111111111111');
    expect(resultado).toEqual('111111111111111');
  });
});