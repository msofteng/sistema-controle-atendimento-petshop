package com.metaway.petshop.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.*;

import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.data.domain.*;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.*;
import com.metaway.petshop.repository.*;

public class UsuarioServiceTest {
  @InjectMocks
  private UsuarioService service;

  @Mock
  private UsuarioRepository repository;

  @Mock
  private ContatoRepository contatoRepository;

  @Mock
  private EnderecoRepository enderecoRepository;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void deveCadastrarUsuario() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setNome("Teste");
    usuario.setContatos(Arrays.asList(new ContatoEntity()));
    usuario.setEnderecos(Arrays.asList(new EnderecoEntity()));
    usuario.setPets(Arrays.asList(new PetEntity()));

    when(repository.save(usuario)).thenReturn(usuario);

    UsuarioEntity usuarioSalvo = service.cadastrar(usuario);

    assertNotNull(usuarioSalvo);
    assertEquals("Teste", usuarioSalvo.getNome());
    verify(repository, times(1)).save(usuario);
  }

  @Test
  void deveExcluirUsuario() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setId(1L);

    service.excluir(usuario);

    verify(repository, times(1)).removerAtendimentosPetsUsuario(1L);
    verify(repository, times(1)).removerPetsUsuario(1L);
    verify(repository, times(1)).removerRacasPetsUsuario(1L);
    verify(repository, times(1)).removerEnderecosUsuario(1L);
    verify(repository, times(1)).removerContatosUsuario(1L);
    verify(repository, times(1)).removerUsuario(1L);
  }

  @Test
  void deveListarUsuarios() {
    FilterDTO<UsuarioEntity> filter = new FilterDTO<UsuarioEntity>();
    filter.setPage(1);
    filter.setQtd(10);

    List<UsuarioEntity> usuarios = new ArrayList<UsuarioEntity>();
    usuarios.add(new UsuarioEntity());
    usuarios.add(new UsuarioEntity());

    when(repository.findAll(any(Pageable.class))).thenReturn(new PageImpl<UsuarioEntity>(usuarios));

    List<UsuarioEntity> lista = service.listar(filter);

    assertEquals(2, lista.size());
    verify(repository, times(1)).findAll(any(Pageable.class));
  }

  @Test
  void testSetPage() {
    List<UsuarioEntity> listaUsuarios = Arrays.asList(new UsuarioEntity(), new UsuarioEntity());
    Page<UsuarioEntity> pageMock = new PageImpl<UsuarioEntity>(listaUsuarios);

    when(repository.findAll(any(Pageable.class))).thenReturn(pageMock);

    FilterDTO<UsuarioEntity> filterNullPage = new FilterDTO<UsuarioEntity>();
    service.listar(filterNullPage);
    assertEquals(1, filterNullPage.getPage());

    FilterDTO<UsuarioEntity> filterPageMenorQue1 = new FilterDTO<UsuarioEntity>();
    filterPageMenorQue1.setPage(0);
    service.listar(filterPageMenorQue1);
    assertEquals(1, filterPageMenorQue1.getPage());

    FilterDTO<UsuarioEntity> filterPageValida = new FilterDTO<UsuarioEntity>();
    filterPageValida.setPage(3);
    service.listar(filterPageValida);
    assertEquals(3, filterPageValida.getPage());
  }

  @Test
  void testSetQtd() {
    List<UsuarioEntity> listaUsuarios = Arrays.asList(new UsuarioEntity(), new UsuarioEntity());
    Page<UsuarioEntity> pageMock = new PageImpl<UsuarioEntity>(listaUsuarios);

    when(repository.findAll(any(Pageable.class))).thenReturn(pageMock);
    when(repository.count()).thenReturn(15L);

    FilterDTO<UsuarioEntity> filterNullQtd = new FilterDTO<UsuarioEntity>();
    service.listar(filterNullQtd);
    assertEquals(15, filterNullQtd.getQtd());

    FilterDTO<UsuarioEntity> filterQtdMenorQue1 = new FilterDTO<UsuarioEntity>();
    filterQtdMenorQue1.setQtd(0);
    service.listar(filterQtdMenorQue1);
    assertEquals(15, filterQtdMenorQue1.getQtd());

    FilterDTO<UsuarioEntity> filterQtdValida = new FilterDTO<UsuarioEntity>();
    filterQtdValida.setQtd(2);
    service.listar(filterQtdValida);
    assertEquals(2, filterQtdValida.getQtd());

    when(repository.count()).thenReturn(0L);
    FilterDTO<UsuarioEntity> filterNullQtdCountZero = new FilterDTO<UsuarioEntity>();
    service.listar(filterNullQtdCountZero);
    assertEquals(10, filterNullQtdCountZero.getQtd());
  }

  @Test
  void deveRemoverContato() {
    ContatoEntity contato = new ContatoEntity();
    contato.setId(1L);

    service.removerContato(contato);

    verify(contatoRepository, times(1)).deleteById(1L);
  }

  @Test
  void naoDeveRemoverContatoComIdNulo() {
    ContatoEntity contato = new ContatoEntity();
    contato.setId(null);

    service.removerContato(contato);

    verify(contatoRepository, times(0)).deleteById(anyLong());
  }

  @Test
  void deveRemoverEndereco() {
    EnderecoEntity endereco = new EnderecoEntity();
    endereco.setId(1L);

    service.removerEndereco(endereco);

    verify(enderecoRepository, times(1)).deleteById(1L);
  }

  @Test
  void naoDeveRemoverEnderecoComIdNulo() {
    EnderecoEntity endereco = new EnderecoEntity();
    endereco.setId(null);

    service.removerEndereco(endereco);

    verify(enderecoRepository, times(0)).deleteById(anyLong());
  }
}