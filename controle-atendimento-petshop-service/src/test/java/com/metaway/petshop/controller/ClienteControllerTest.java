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
import com.metaway.petshop.entity.*;
import com.metaway.petshop.service.ClienteService;

@SpringBootTest
@AutoConfigureMockMvc
public class ClienteControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private ClienteService service;

  @Test
  void deveSalvarCliente() throws Exception {
    ClienteEntity cliente = new ClienteEntity();
    cliente.setNome("Teste");
    cliente.setContatos(new ArrayList<>());
    cliente.setEnderecos(new ArrayList<>());

    when(service.cadastrar(cliente)).thenReturn(cliente);

    mockMvc.perform(
      post("/cliente/salvar")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(cliente)))
        .andExpect(status().isCreated()
    );

    verify(service, times(1)).cadastrar(cliente);
  }

  @Test
  void deveExcluirCliente() throws Exception {
    ClienteEntity cliente = new ClienteEntity();
    cliente.setId(1L);

    mockMvc.perform(
      delete("/cliente/excluir")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(cliente)))
        .andExpect(status().isNoContent()
    );

    verify(service, times(1)).excluir(cliente);
  }

  @Test
  void deveExcluirContato() throws Exception {
    ContatoEntity contato = new ContatoEntity();
    contato.setId(1L);

    mockMvc.perform(
      delete("/cliente/contato/excluir")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(contato)))
        .andExpect(status().isNoContent()
    );

    verify(service, times(1)).removerContato(contato);
  }

  @Test
  void deveExcluirEndereco() throws Exception {
    EnderecoEntity endereco = new EnderecoEntity();
    endereco.setId(1L);

    mockMvc.perform(
      delete("/cliente/endereco/excluir")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(endereco)))
        .andExpect(status().isNoContent()
    );

    verify(service, times(1)).removerEndereco(endereco);
  }

  @Test
  void deveListarClientes() throws Exception {
    FilterDTO<ClienteEntity> filtro = new FilterDTO<>();
    filtro.setPage(1);
    filtro.setQtd(10);

    List<ClienteEntity> clientes = new ArrayList<>();
    clientes.add(new ClienteEntity());
    clientes.add(new ClienteEntity());

    when(service.listar(filtro)).thenReturn(clientes);

    mockMvc.perform(
      post("/cliente/listar")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(filtro)))
        .andExpect(status().isOk())
        .andExpect(content().contentType(APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(clientes))
    );

    verify(service, times(1)).listar(filtro);
  }
}