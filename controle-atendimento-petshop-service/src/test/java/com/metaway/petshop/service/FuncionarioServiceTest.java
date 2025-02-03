package com.metaway.petshop.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.*;
import org.mockito.*;

import com.metaway.petshop.entity.FuncionarioEntity;
import com.metaway.petshop.repository.FuncionarioRepository;

public class FuncionarioServiceTest {
  @InjectMocks
  private FuncionarioService service;

  @Mock
  private FuncionarioRepository repository;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void deveCadastrarFuncionario() {
    FuncionarioEntity funcionario = new FuncionarioEntity();
    funcionario.setNome("Teste");

    when(repository.save(funcionario)).thenReturn(funcionario);

    FuncionarioEntity funcionarioSalvo = service.cadastrar(funcionario);

    assertNotNull(funcionarioSalvo);
    assertEquals("Teste", funcionarioSalvo.getNome());
    verify(repository, times(1)).save(funcionario);
  }

  @Test
  void deveExcluirFuncionario() {
    FuncionarioEntity funcionario = new FuncionarioEntity();
    funcionario.setId(1L);

    service.excluir(funcionario);

    verify(repository, times(1)).deleteById(1L);
  }
}