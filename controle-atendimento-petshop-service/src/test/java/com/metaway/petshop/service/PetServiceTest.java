package com.metaway.petshop.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.data.domain.*;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.PetEntity;
import com.metaway.petshop.repository.PetRepository;

public class PetServiceTest {
  @InjectMocks
  private PetService service;

  @Mock
  private PetRepository repository;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void deveCadastrarPet() {
    PetEntity pet = new PetEntity();
    pet.setNome("Teste");

    when(repository.save(pet)).thenReturn(pet);

    PetEntity petSalvo = service.cadastrar(pet);

    assertNotNull(petSalvo);
    assertEquals("Teste", petSalvo.getNome());
    verify(repository, times(1)).save(pet);
  }

  @Test
  void deveExcluirPet() {
    PetEntity pet = new PetEntity();
    pet.setId(1L);

    service.excluir(pet);

    verify(repository, times(1)).removerAtendimentosPet(1L);

    verify(repository, times(1)).removerRacasPet(1L);

    verify(repository, times(1)).excluirPet(1L);
  }

  @Test
  void deveListarPets() {
    FilterDTO<PetEntity> filter = new FilterDTO<PetEntity>();
    filter.setPage(1);
    filter.setQtd(10);

    List<PetEntity> pets = new ArrayList<PetEntity>();
    pets.add(new PetEntity());
    pets.add(new PetEntity());

    when(repository.findAll(any(Pageable.class))).thenReturn(new PageImpl<PetEntity>(pets));

    List<PetEntity> lista = service.listar(filter);

    assertEquals(2, lista.size());
    verify(repository, times(1)).findAll(any(Pageable.class));
  }

  @Test
  void testSetPage() {
    List<PetEntity> listaPets = Arrays.asList(new PetEntity(), new PetEntity());
    Page<PetEntity> pageMock = new PageImpl<PetEntity>(listaPets);

    when(repository.findAll(any(Pageable.class))).thenReturn(pageMock);

    FilterDTO<PetEntity> filterNullPage = new FilterDTO<PetEntity>();
    service.listar(filterNullPage);
    assertEquals(1, filterNullPage.getPage());

    FilterDTO<PetEntity> filterPageMenorQue1 = new FilterDTO<PetEntity>();
    filterPageMenorQue1.setPage(0);
    service.listar(filterPageMenorQue1);
    assertEquals(1, filterPageMenorQue1.getPage());

    FilterDTO<PetEntity> filterPageValida = new FilterDTO<PetEntity>();
    filterPageValida.setPage(3);
    service.listar(filterPageValida);
    assertEquals(3, filterPageValida.getPage());
  }

  @Test
  void testSetQtd() {
    List<PetEntity> listaPets = Arrays.asList(new PetEntity(), new PetEntity());
    Page<PetEntity> pageMock = new PageImpl<PetEntity>(listaPets);

    when(repository.findAll(any(Pageable.class))).thenReturn(pageMock);
    when(repository.count()).thenReturn(15L);

    FilterDTO<PetEntity> filterNullQtd = new FilterDTO<PetEntity>();
    service.listar(filterNullQtd);
    assertEquals(15, filterNullQtd.getQtd());

    FilterDTO<PetEntity> filterQtdMenorQue1 = new FilterDTO<PetEntity>();
    filterQtdMenorQue1.setQtd(0);
    service.listar(filterQtdMenorQue1);
    assertEquals(15, filterQtdMenorQue1.getQtd());

    FilterDTO<PetEntity> filterQtdValida = new FilterDTO<PetEntity>();
    filterQtdValida.setQtd(2);
    service.listar(filterQtdValida);
    assertEquals(2, filterQtdValida.getQtd());

    when(repository.count()).thenReturn(0L);
    FilterDTO<PetEntity> filterNullQtdCountZero = new FilterDTO<PetEntity>();
    service.listar(filterNullQtdCountZero);
    assertEquals(10, filterNullQtdCountZero.getQtd());
  }
}