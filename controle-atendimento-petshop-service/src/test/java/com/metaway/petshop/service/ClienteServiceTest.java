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

public class ClienteServiceTest {
  @InjectMocks
  private ClienteService service;

  @Mock
  private ClienteRepository repository;

  @Mock
  private ContatoRepository contatoRepository;

  @Mock
  private EnderecoRepository enderecoRepository;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void deveCadastrarCliente() {
    ClienteEntity cliente = new ClienteEntity();
    cliente.setNome("Teste");
    cliente.setContatos(Arrays.asList(new ContatoEntity()));
    cliente.setEnderecos(Arrays.asList(new EnderecoEntity()));
    cliente.setPets(Arrays.asList(new PetEntity()));

    when(repository.save(cliente)).thenReturn(cliente);

    ClienteEntity clienteSalvo = service.cadastrar(cliente);

    assertNotNull(clienteSalvo);
    assertEquals("Teste", clienteSalvo.getNome());
    verify(repository, times(1)).save(cliente);
  }

  @Test
  void deveExcluirCliente() {
    ClienteEntity cliente = new ClienteEntity();
    cliente.setId(1L);

    service.excluir(cliente);

    verify(repository, times(1)).removerAtendimentosPetsCliente(1L);
    verify(repository, times(1)).removerPetsCliente(1L);
    verify(repository, times(1)).removerRacasPetsCliente(1L);
    verify(repository, times(1)).removerEnderecosCliente(1L);
    verify(repository, times(1)).removerContatosCliente(1L);
    verify(repository, times(1)).removerCliente(1L);
  }

  @Test
  void deveListarClientes() {
    FilterDTO<ClienteEntity> filter = new FilterDTO<ClienteEntity>();
    filter.setPage(1);
    filter.setQtd(10);

    List<ClienteEntity> clientes = new ArrayList<ClienteEntity>();
    clientes.add(new ClienteEntity());
    clientes.add(new ClienteEntity());

    when(repository.findAll(any(Pageable.class))).thenReturn(new PageImpl<ClienteEntity>(clientes));

    List<ClienteEntity> lista = service.listar(filter);

    assertEquals(2, lista.size());
    verify(repository, times(1)).findAll(any(Pageable.class));
  }

  @Test
  void testSetPage() {
    List<ClienteEntity> listaClientes = Arrays.asList(new ClienteEntity(), new ClienteEntity());
    Page<ClienteEntity> pageMock = new PageImpl<ClienteEntity>(listaClientes);

    when(repository.findAll(any(Pageable.class))).thenReturn(pageMock);

    FilterDTO<ClienteEntity> filterNullPage = new FilterDTO<ClienteEntity>();
    service.listar(filterNullPage);
    assertEquals(1, filterNullPage.getPage());

    FilterDTO<ClienteEntity> filterPageMenorQue1 = new FilterDTO<ClienteEntity>();
    filterPageMenorQue1.setPage(0);
    service.listar(filterPageMenorQue1);
    assertEquals(1, filterPageMenorQue1.getPage());

    FilterDTO<ClienteEntity> filterPageValida = new FilterDTO<ClienteEntity>();
    filterPageValida.setPage(3);
    service.listar(filterPageValida);
    assertEquals(3, filterPageValida.getPage());
  }

  @Test
  void testSetQtd() {
    List<ClienteEntity> listaClientes = Arrays.asList(new ClienteEntity(), new ClienteEntity());
    Page<ClienteEntity> pageMock = new PageImpl<ClienteEntity>(listaClientes);

    when(repository.findAll(any(Pageable.class))).thenReturn(pageMock);
    when(repository.count()).thenReturn(15L);

    FilterDTO<ClienteEntity> filterNullQtd = new FilterDTO<ClienteEntity>();
    service.listar(filterNullQtd);
    assertEquals(15, filterNullQtd.getQtd());

    FilterDTO<ClienteEntity> filterQtdMenorQue1 = new FilterDTO<ClienteEntity>();
    filterQtdMenorQue1.setQtd(0);
    service.listar(filterQtdMenorQue1);
    assertEquals(15, filterQtdMenorQue1.getQtd());

    FilterDTO<ClienteEntity> filterQtdValida = new FilterDTO<ClienteEntity>();
    filterQtdValida.setQtd(2);
    service.listar(filterQtdValida);
    assertEquals(2, filterQtdValida.getQtd());

    when(repository.count()).thenReturn(0L);
    FilterDTO<ClienteEntity> filterNullQtdCountZero = new FilterDTO<ClienteEntity>();
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