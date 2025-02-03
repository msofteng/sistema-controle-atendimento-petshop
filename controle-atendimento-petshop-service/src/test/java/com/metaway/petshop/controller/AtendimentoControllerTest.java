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
import com.metaway.petshop.entity.AtendimentoEntity;
import com.metaway.petshop.service.AtendimentoService;

@SpringBootTest
@AutoConfigureMockMvc
public class AtendimentoControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private AtendimentoService service;

  @Test
  void deveSalvarAtendimento() throws Exception {
    AtendimentoEntity atendimento = new AtendimentoEntity();
    atendimento.setDescricao("Teste");

    when(service.cadastrar(atendimento)).thenReturn(atendimento);

    mockMvc.perform(
      post("/atendimento/salvar")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(atendimento)))
        .andExpect(status().isCreated())
        .andExpect(content().contentType(APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(atendimento))
    );

    verify(service, times(1)).cadastrar(atendimento);
  }

  @Test
  void deveExcluirAtendimento() throws Exception {
    AtendimentoEntity atendimento = new AtendimentoEntity();
    atendimento.setId(1L);

    mockMvc.perform(
      delete("/atendimento/excluir")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(atendimento)))
        .andExpect(status().isNoContent()
    );

    verify(service, times(1)).excluir(atendimento);
  }

  @Test
  void deveListarAtendimentos() throws Exception {
    FilterDTO<AtendimentoEntity> filtro = new FilterDTO<>();
    filtro.setPage(1);
    filtro.setQtd(10);

    List<AtendimentoEntity> atendimentos = new ArrayList<>();
    atendimentos.add(new AtendimentoEntity());
    atendimentos.add(new AtendimentoEntity());

    when(service.listar(filtro)).thenReturn(atendimentos);

    mockMvc.perform(
      post("/atendimento/listar")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(filtro)))
        .andExpect(status().isOk())
        .andExpect(content().contentType(APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(atendimentos))
    );

    verify(service, times(1)).listar(filtro);
  }
}