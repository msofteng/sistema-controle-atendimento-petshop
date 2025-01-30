import { CpfPipe } from './cpf.pipe';

describe('CpfPipe', () => {
  it('criar uma instância', () => {
    const pipe = new CpfPipe();
    expect(pipe).toBeTruthy();
  });
});