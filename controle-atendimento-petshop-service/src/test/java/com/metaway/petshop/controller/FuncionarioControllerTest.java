package com.metaway.petshop.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.http.MediaType.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.metaway.petshop.entity.FuncionarioEntity;
import com.metaway.petshop.service.FuncionarioService;

@SpringBootTest
@AutoConfigureMockMvc
public class FuncionarioControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private FuncionarioService service;

  @Test
  void deveSalvarFuncionario() throws Exception {
    FuncionarioEntity funcionario = new FuncionarioEntity();
    funcionario.setNome("Teste");

    when(service.cadastrar(funcionario)).thenReturn(funcionario);

    mockMvc.perform(
      post("/funcionario/salvar")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(funcionario))
    )
      .andExpect(status().isCreated())
      .andExpect(content().contentType(APPLICATION_JSON))
      .andExpect(content().json(objectMapper.writeValueAsString(funcionario)));

    verify(service, times(1)).cadastrar(funcionario);
  }

  @Test
  void deveExcluirFuncionario() throws Exception {
    FuncionarioEntity funcionario = new FuncionarioEntity();
    funcionario.setId(1L);

    mockMvc.perform(
      delete("/funcionario/excluir")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(funcionario))
    ).andExpect(status().isNoContent());

    verify(service, times(1)).excluir(funcionario);
  }
}