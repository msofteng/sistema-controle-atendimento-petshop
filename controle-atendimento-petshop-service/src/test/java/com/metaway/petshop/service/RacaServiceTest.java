package com.metaway.petshop.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.*;

import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.data.domain.*;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.RacaEntity;
import com.metaway.petshop.repository.RacaRepository;

public class RacaServiceTest {
  @InjectMocks
  private RacaService service;

  @Mock
  private RacaRepository repository;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void deveCadastrarRaca() {
    RacaEntity raca = new RacaEntity();
    raca.setDescricao("Teste");

    when(repository.save(raca)).thenReturn(raca);

    RacaEntity racaSalva = service.cadastrar(raca);

    assertNotNull(racaSalva);
    assertEquals("Teste", racaSalva.getDescricao());
    verify(repository, times(1)).save(raca);
  }

  @Test
  void deveExcluirRaca() {
    RacaEntity raca = new RacaEntity();
    raca.setId(1L);

    service.excluir(raca);

    verify(repository, times(1)).removerRacaPet(1L);
    verify(repository, times(1)).excluirRaca(1L);
  }

  @Test
  void deveListarRacas() {
    FilterDTO<RacaEntity> filter = new FilterDTO<RacaEntity>();
    filter.setPage(1);
    filter.setQtd(10);

    List<RacaEntity> racas = new ArrayList<RacaEntity>();
    racas.add(new RacaEntity());
    racas.add(new RacaEntity());

    when(repository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(racas));

    List<RacaEntity> lista = service.listar(filter);

    assertEquals(2, lista.size());
    verify(repository, times(1)).findAll(any(Pageable.class));
  }

  @Test
  void testSetPage() {
    List<RacaEntity> listaRacas = Arrays.asList(new RacaEntity(), new RacaEntity());
    Page<RacaEntity> pageMock = new PageImpl<RacaEntity>(listaRacas);

    when(repository.findAll(any(Pageable.class))).thenReturn(pageMock);

    FilterDTO<RacaEntity> filterNullPage = new FilterDTO<RacaEntity>();
    service.listar(filterNullPage);
    assertEquals(1, filterNullPage.getPage());

    FilterDTO<RacaEntity> filterPageMenorQue1 = new FilterDTO<RacaEntity>();
    filterPageMenorQue1.setPage(0);
    service.listar(filterPageMenorQue1);
    assertEquals(1, filterPageMenorQue1.getPage());

    FilterDTO<RacaEntity> filterPageValida = new FilterDTO<RacaEntity>();
    filterPageValida.setPage(3);
    service.listar(filterPageValida);
    assertEquals(3, filterPageValida.getPage());
  }

  @Test
  void testSetQtd() {
    List<RacaEntity> listaRacas = Arrays.asList(new RacaEntity(), new RacaEntity());
    Page<RacaEntity> pageMock = new PageImpl<RacaEntity>(listaRacas);

    when(repository.findAll(any(Pageable.class))).thenReturn(pageMock);
    when(repository.count()).thenReturn(15L);

    FilterDTO<RacaEntity> filterNullQtd = new FilterDTO<RacaEntity>();
    service.listar(filterNullQtd);
    assertEquals(15, filterNullQtd.getQtd());

    FilterDTO<RacaEntity> filterQtdMenorQue1 = new FilterDTO<RacaEntity>();
    filterQtdMenorQue1.setQtd(0);
    service.listar(filterQtdMenorQue1);
    assertEquals(15, filterQtdMenorQue1.getQtd());

    FilterDTO<RacaEntity> filterQtdValida = new FilterDTO<RacaEntity>();
    filterQtdValida.setQtd(2);
    service.listar(filterQtdValida);
    assertEquals(2, filterQtdValida.getQtd());

    when(repository.count()).thenReturn(0L);
    FilterDTO<RacaEntity> filterNullQtdCountZero = new FilterDTO<RacaEntity>();
    service.listar(filterNullQtdCountZero);
    assertEquals(10, filterNullQtdCountZero.getQtd());
  }
}