package com.metaway.petshop.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.data.domain.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.AtendimentoEntity;
import com.metaway.petshop.repository.*;

public class AtendimentoServiceTest {
  @InjectMocks
  private AtendimentoService service;

  @Mock
  private AtendimentoRepository repository;

  @Mock
  private ClienteRepository clienteRepository;

  @Mock
  private ContatoRepository contatoRepository;

  @Mock
  private EnderecoRepository enderecoRepository;

  @Mock
  private PetRepository petRepository;

  @Mock
  private RacaRepository racaRepository;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void deveCadastrarAtendimentoComPayload() throws JsonMappingException, JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper() {{
      registerModule(new JavaTimeModule());
    }};

    AtendimentoEntity atendimento = mapper.readValue("{\"descricao\":\"banho e tosa\",\"valor\":700,\"data\":\"2025-02-03\",\"pets\":[{\"nome\":\"lili\",\"dataNascimento\":\"2021-05-04\",\"raca\":[{\"descricao\":\"vira lata\"}],\"cliente\":{\"nome\":\"pedro\",\"senha\":\"12345678910\",\"cpf\":12345678910,\"dataCadastro\":\"2025-02-03\",\"contatos\":[{\"valor\":\"pedro@pedro.com\",\"tipo\":\"e-mail\"}],\"enderecos\":[{\"logradouro\":\"avenida getulio vargas\",\"cidade\":\"sao paulo - sp\",\"bairro\":\"liberdade\",\"complemento\":\"casa\"}],\"pets\":[]}}]}", AtendimentoEntity.class);

    when(repository.save(atendimento)).thenReturn(atendimento);

    AtendimentoEntity atendimentoSalvo = service.cadastrar(atendimento);

    assertNotNull(atendimentoSalvo);
    assertEquals("banho e tosa", atendimentoSalvo.getDescricao());
    verify(repository, times(1)).save(atendimento);
  }

  @Test
  void deveAtualizarAtendimentoComPayload() throws JsonMappingException, JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper() {{
      registerModule(new JavaTimeModule());
    }};

    AtendimentoEntity atendimento = mapper.readValue("{\"descricao\":\"banho e tosa\",\"valor\":700,\"data\":\"2025-02-03\",\"pets\":[{\"id\":\"1\",\"nome\":\"lili\",\"dataNascimento\":\"2021-05-04\",\"raca\":[{\"id\":\"1\",\"descricao\":\"vira lata\"}],\"cliente\":{\"id\":\"1\",\"nome\":\"pedro\",\"senha\":\"12345678910\",\"cpf\":12345678910,\"dataCadastro\":\"2025-02-03\",\"contatos\":[{\"valor\":\"pedro@pedro.com\",\"tipo\":\"e-mail\"}],\"enderecos\":[{\"logradouro\":\"avenida getulio vargas\",\"cidade\":\"sao paulo - sp\",\"bairro\":\"liberdade\",\"complemento\":\"casa\"}],\"pets\":[]}}]}", AtendimentoEntity.class);

    when(repository.save(atendimento)).thenReturn(atendimento);

    AtendimentoEntity atendimentoSalvo = service.cadastrar(atendimento);

    assertNotNull(atendimentoSalvo);
    assertEquals("banho e tosa", atendimentoSalvo.getDescricao());
    verify(repository, times(1)).save(atendimento);
  }

  @Test
  void deveAtualizarAtendimentoComListasVaziasPayload() throws JsonMappingException, JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper() {{
      registerModule(new JavaTimeModule());
    }};

    AtendimentoEntity atendimento = mapper.readValue("{\"descricao\":\"banho e tosa\",\"valor\":700,\"data\":\"2025-02-03\",\"pets\":[{\"id\":\"1\",\"nome\":\"lili\",\"dataNascimento\":\"2021-05-04\"}]}", AtendimentoEntity.class);

    when(repository.save(atendimento)).thenReturn(atendimento);

    AtendimentoEntity atendimentoSalvo = service.cadastrar(atendimento);

    assertNotNull(atendimentoSalvo);
    assertEquals("banho e tosa", atendimentoSalvo.getDescricao());
    verify(repository, times(1)).save(atendimento);
  }

  @Test
  void deveListarAtendimentos() {
    FilterDTO<AtendimentoEntity> filter = new FilterDTO<>();
    filter.setPage(1);
    filter.setQtd(10);

    List<AtendimentoEntity> atendimentos = new ArrayList<>();
    atendimentos.add(new AtendimentoEntity());
    atendimentos.add(new AtendimentoEntity());

    when(repository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(atendimentos));

    List<AtendimentoEntity> lista = service.listar(filter);

    assertEquals(2, lista.size());
    verify(repository, times(1)).findAll(any(Pageable.class));
  }

  @Test
  void deveExcluirAtendimento() {
    AtendimentoEntity atendimento = new AtendimentoEntity();
    atendimento.setId(1L);

    service.excluir(atendimento);

    verify(repository, times(1)).removerPetsAtendimento(1L);
    verify(repository, times(1)).removerAtendimento(1L);
  }

  @Test
  void testSetPage() {
    List<AtendimentoEntity> listaAtendimentos = List.of(new AtendimentoEntity(), new AtendimentoEntity());
    Page<AtendimentoEntity> pageMock = new PageImpl<AtendimentoEntity>(listaAtendimentos);

    when(repository.findAll(any(Pageable.class))).thenReturn(pageMock);

    FilterDTO<AtendimentoEntity> filterNullPage = new FilterDTO<AtendimentoEntity>();
    service.listar(filterNullPage);
    assertEquals(1, filterNullPage.getPage());

    FilterDTO<AtendimentoEntity> filterPageMenorQue1 = new FilterDTO<AtendimentoEntity>();
    filterPageMenorQue1.setPage(0);
    service.listar(filterPageMenorQue1);
    assertEquals(1, filterPageMenorQue1.getPage());

    FilterDTO<AtendimentoEntity> filterPageValida = new FilterDTO<AtendimentoEntity>();
    filterPageValida.setPage(3);
    service.listar(filterPageValida);
    assertEquals(3, filterPageValida.getPage());
  }

  @Test
  void testSetQtd() {
    List<AtendimentoEntity> listaAtendimentos = List.of(new AtendimentoEntity(), new AtendimentoEntity());
    Page<AtendimentoEntity> pageMock = new PageImpl<AtendimentoEntity>(listaAtendimentos);

    when(repository.findAll(any(Pageable.class))).thenReturn(pageMock);
    when(repository.count()).thenReturn(15L);

    FilterDTO<AtendimentoEntity> filterNullQtd = new FilterDTO<AtendimentoEntity>();
    service.listar(filterNullQtd);
    assertEquals(15, filterNullQtd.getQtd());

    FilterDTO<AtendimentoEntity> filterQtdMenorQue1 = new FilterDTO<AtendimentoEntity>();
    filterQtdMenorQue1.setQtd(0);
    service.listar(filterQtdMenorQue1);
    assertEquals(15, filterQtdMenorQue1.getQtd());

    FilterDTO<AtendimentoEntity> filterQtdValida = new FilterDTO<AtendimentoEntity>();
    filterQtdValida.setQtd(2);
    service.listar(filterQtdValida);
    assertEquals(2, filterQtdValida.getQtd());

    when(repository.count()).thenReturn(0L);
    FilterDTO<AtendimentoEntity> filterNullQtdCountZero = new FilterDTO<AtendimentoEntity>();
    service.listar(filterNullQtdCountZero);
    assertEquals(10, filterNullQtdCountZero.getQtd());
  }

  @Test
  void testarCadastroComCamposNulos() throws JsonMappingException, JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper() {{
      registerModule(new JavaTimeModule());
    }};
    
    AtendimentoEntity atendimentoMock = mapper.readValue("{\"descricao\":\"banho e tosa\",\"valor\":700,\"data\":\"2025-02-03\",\"pets\":[{\"nome\":\"lili\",\"dataNascimento\":\"2021-05-04\",\"raca\":[{\"descricao\":\"vira lata\"}],\"cliente\":{\"nome\":\"pedro\",\"senha\":\"12345678910\",\"cpf\":12345678910,\"dataCadastro\":\"2025-02-03\",\"contatos\":[{\"valor\":\"pedro@pedro.com\",\"tipo\":\"e-mail\"}],\"enderecos\":[{\"logradouro\":\"avenida getulio vargas\",\"cidade\":\"sao paulo - sp\",\"bairro\":\"liberdade\",\"complemento\":\"casa\"}],\"pets\":[]}}]}", AtendimentoEntity.class);
    when(repository.save(atendimentoMock)).thenReturn(atendimentoMock);
    service.cadastrar(atendimentoMock);

    atendimentoMock = mapper.readValue("{\"descricao\":\"banho e tosa\",\"valor\":700,\"data\":\"2025-02-03\",\"pets\":[{\"nome\":\"lili\",\"dataNascimento\":\"2021-05-04\",\"raca\":[{\"descricao\":\"vira lata\"}]}]}", AtendimentoEntity.class);
    when(repository.save(atendimentoMock)).thenReturn(atendimentoMock);
    service.cadastrar(atendimentoMock);
    assertEquals(null, atendimentoMock.getPets().stream().toList().get(0).getCliente());

    atendimentoMock = mapper.readValue("{\"descricao\":\"banho e tosa\",\"valor\":700,\"data\":\"2025-02-03\",\"pets\":[{\"nome\":\"lili\",\"dataNascimento\":\"2021-05-04\",\"raca\":[{\"descricao\":\"vira lata\"}],\"cliente\":{\"nome\":\"pedro\",\"senha\":\"12345678910\",\"cpf\":12345678910,\"dataCadastro\":\"2025-02-03\",\"enderecos\":[{\"logradouro\":\"avenida getulio vargas\",\"cidade\":\"sao paulo - sp\",\"bairro\":\"liberdade\",\"complemento\":\"casa\"}],\"pets\":[]}}]}", AtendimentoEntity.class);
    when(clienteRepository.save(atendimentoMock.getPets().stream().toList().get(0).getCliente())).thenReturn(atendimentoMock.getPets().stream().toList().get(0).getCliente());
    when(repository.save(atendimentoMock)).thenReturn(atendimentoMock);
    service.cadastrar(atendimentoMock);
    assertEquals(null, atendimentoMock.getPets().stream().toList().get(0).getCliente().getContatos());

    atendimentoMock = mapper.readValue("{\"descricao\":\"banho e tosa\",\"valor\":700,\"data\":\"2025-02-03\",\"pets\":[{\"nome\":\"lili\",\"dataNascimento\":\"2021-05-04\",\"raca\":[{\"descricao\":\"vira lata\"}],\"cliente\":{\"nome\":\"pedro\",\"senha\":\"12345678910\",\"cpf\":12345678910,\"dataCadastro\":\"2025-02-03\",\"contatos\":[],\"enderecos\":[{\"logradouro\":\"avenida getulio vargas\",\"cidade\":\"sao paulo - sp\",\"bairro\":\"liberdade\",\"complemento\":\"casa\"}],\"pets\":[]}}]}", AtendimentoEntity.class);
    when(clienteRepository.save(atendimentoMock.getPets().stream().toList().get(0).getCliente())).thenReturn(atendimentoMock.getPets().stream().toList().get(0).getCliente());
    when(repository.save(atendimentoMock)).thenReturn(atendimentoMock);
    service.cadastrar(atendimentoMock);
    assertEquals(0, atendimentoMock.getPets().stream().toList().get(0).getCliente().getContatos().size());

    atendimentoMock = mapper.readValue("{\"descricao\":\"banho e tosa\",\"valor\":700,\"data\":\"2025-02-03\",\"pets\":[{\"nome\":\"lili\",\"dataNascimento\":\"2021-05-04\",\"raca\":[{\"descricao\":\"vira lata\"}],\"cliente\":{\"nome\":\"pedro\",\"senha\":\"12345678910\",\"cpf\":12345678910,\"dataCadastro\":\"2025-02-03\",\"contatos\":[{\"valor\":\"pedro@pedro.com\",\"tipo\":\"e-mail\"}],\"pets\":[]}}]}", AtendimentoEntity.class);
    when(clienteRepository.save(atendimentoMock.getPets().stream().toList().get(0).getCliente())).thenReturn(atendimentoMock.getPets().stream().toList().get(0).getCliente());
    when(repository.save(atendimentoMock)).thenReturn(atendimentoMock);
    service.cadastrar(atendimentoMock);
    assertEquals(null, atendimentoMock.getPets().stream().toList().get(0).getCliente().getEnderecos());

    atendimentoMock = mapper.readValue("{\"descricao\":\"banho e tosa\",\"valor\":700,\"data\":\"2025-02-03\",\"pets\":[{\"nome\":\"lili\",\"dataNascimento\":\"2021-05-04\",\"raca\":[{\"descricao\":\"vira lata\"}],\"cliente\":{\"nome\":\"pedro\",\"senha\":\"12345678910\",\"cpf\":12345678910,\"dataCadastro\":\"2025-02-03\",\"contatos\":[{\"valor\":\"pedro@pedro.com\",\"tipo\":\"e-mail\"}],\"enderecos\":[],\"pets\":[]}}]}", AtendimentoEntity.class);
    when(clienteRepository.save(atendimentoMock.getPets().stream().toList().get(0).getCliente())).thenReturn(atendimentoMock.getPets().stream().toList().get(0).getCliente());
    when(repository.save(atendimentoMock)).thenReturn(atendimentoMock);
    service.cadastrar(atendimentoMock);
    assertEquals(0, atendimentoMock.getPets().stream().toList().get(0).getCliente().getEnderecos().size());

    atendimentoMock = mapper.readValue("{\"descricao\":\"banho e tosa\",\"valor\":700,\"data\":\"2025-02-03\",\"pets\":[{\"nome\":\"lili\",\"dataNascimento\":\"2021-05-04\",\"cliente\":{\"nome\":\"pedro\",\"senha\":\"12345678910\",\"cpf\":12345678910,\"dataCadastro\":\"2025-02-03\",\"contatos\":[{\"valor\":\"pedro@pedro.com\",\"tipo\":\"e-mail\"}],\"enderecos\":[{\"logradouro\":\"avenida getulio vargas\",\"cidade\":\"sao paulo - sp\",\"bairro\":\"liberdade\",\"complemento\":\"casa\"}],\"pets\":[]}}]}", AtendimentoEntity.class);
    when(clienteRepository.save(atendimentoMock.getPets().stream().toList().get(0).getCliente())).thenReturn(atendimentoMock.getPets().stream().toList().get(0).getCliente());
    when(repository.save(atendimentoMock)).thenReturn(atendimentoMock);
    service.cadastrar(atendimentoMock);
    assertEquals(null, atendimentoMock.getPets().stream().toList().get(0).getRaca());

    atendimentoMock = mapper.readValue("{\"descricao\":\"banho e tosa\",\"valor\":700,\"data\":\"2025-02-03\",\"pets\":[{\"nome\":\"lili\",\"dataNascimento\":\"2021-05-04\",\"raca\":[],\"cliente\":{\"nome\":\"pedro\",\"senha\":\"12345678910\",\"cpf\":12345678910,\"dataCadastro\":\"2025-02-03\",\"contatos\":[{\"valor\":\"pedro@pedro.com\",\"tipo\":\"e-mail\"}],\"enderecos\":[{\"logradouro\":\"avenida getulio vargas\",\"cidade\":\"sao paulo - sp\",\"bairro\":\"liberdade\",\"complemento\":\"casa\"}],\"pets\":[]}}]}", AtendimentoEntity.class);
    when(clienteRepository.save(atendimentoMock.getPets().stream().toList().get(0).getCliente())).thenReturn(atendimentoMock.getPets().stream().toList().get(0).getCliente());
    when(repository.save(atendimentoMock)).thenReturn(atendimentoMock);
    service.cadastrar(atendimentoMock);
    assertEquals(0, atendimentoMock.getPets().stream().toList().get(0).getRaca().size());
  }
}