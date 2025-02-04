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
import com.metaway.petshop.service.UsuarioService;

@SpringBootTest
@AutoConfigureMockMvc
public class UsuarioControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private UsuarioService service;

  @Test
  void deveSalvarUsuario() throws Exception {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setNome("Teste");

    when(service.cadastrar(usuario)).thenReturn(usuario);

    mockMvc.perform(
      post("/usuario/salvar")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(usuario))
    ).andExpect(status().isCreated());

    verify(service, times(1)).cadastrar(usuario);
  }

  @Test
  void deveExcluirUsuario() throws Exception {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setId(1L);

    mockMvc.perform(
      delete("/usuario/excluir")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(usuario))
    ).andExpect(status().isNoContent());

    verify(service, times(1)).excluir(usuario);
  }

  @Test
  void deveExcluirContato() throws Exception {
    ContatoEntity contato = new ContatoEntity();
    contato.setId(1L);

    mockMvc.perform(
      delete("/usuario/contato/excluir")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(contato))
    ).andExpect(status().isNoContent());

    verify(service, times(1)).removerContato(contato);
  }

  @Test
  void deveExcluirEndereco() throws Exception {
    EnderecoEntity endereco = new EnderecoEntity();
    endereco.setId(1L);

    mockMvc.perform(
      delete("/usuario/endereco/excluir")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(endereco))
    ).andExpect(status().isNoContent());

    verify(service, times(1)).removerEndereco(endereco);
  }

  @Test
  void deveListarUsuarios() throws Exception {
    FilterDTO<UsuarioEntity> filtro = new FilterDTO<>();
    filtro.setPage(1);
    filtro.setQtd(10);

    List<UsuarioEntity> usuarios = new ArrayList<>();
    usuarios.add(new UsuarioEntity());
    usuarios.add(new UsuarioEntity());

    when(service.listar(filtro)).thenReturn(usuarios);

    mockMvc.perform(
      post("/usuario/listar")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(filtro))
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(APPLICATION_JSON))
      .andExpect(content().json(objectMapper.writeValueAsString(usuarios)));

    verify(service, times(1)).listar(filtro);
  }
}