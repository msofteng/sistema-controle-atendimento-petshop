package com.metaway.petshop.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.http.MediaType.*;

import java.util.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.RacaEntity;
import com.metaway.petshop.service.RacaService;

@SpringBootTest
@AutoConfigureMockMvc
public class RacaControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private RacaService service;

  @Test
  void deveSalvarRaca() throws Exception {
    RacaEntity pet = new RacaEntity();
    pet.setDescricao("Teste");

    when(service.cadastrar(pet)).thenReturn(pet);

    mockMvc.perform(
      post("/raca/salvar")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(pet))
    ).andExpect(status().isCreated());
  }

  @Test
  void deveListarRacas() throws Exception {
    FilterDTO<RacaEntity> filtro = new FilterDTO<>();
    filtro.setPage(1);
    filtro.setQtd(10);

    List<RacaEntity> racas = new ArrayList<>();
    racas.add(new RacaEntity());
    racas.add(new RacaEntity());

    when(service.listar(filtro)).thenReturn(racas);

    mockMvc.perform(
      post("/raca/listar")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(filtro))
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(APPLICATION_JSON))
      .andExpect(content().json(objectMapper.writeValueAsString(racas)));

    verify(service, times(1)).listar(filtro);
  }

  @Test
  void deveExcluirRaca() throws Exception {
    RacaEntity raca = new RacaEntity();
    raca.setId(1L);

    mockMvc.perform(
      delete("/raca/excluir")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(raca))
    ).andExpect(status().isNoContent());
  }
}