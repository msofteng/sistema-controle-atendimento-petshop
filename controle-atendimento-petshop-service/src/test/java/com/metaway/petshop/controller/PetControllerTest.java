package com.metaway.petshop.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.PetEntity;
import com.metaway.petshop.service.PetService;

@SpringBootTest
@AutoConfigureMockMvc
public class PetControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private PetService service;

  @Test
  void deveSalvarPet() throws Exception {
    PetEntity pet = new PetEntity();
    pet.setNome("Teste");

    when(service.cadastrar(pet)).thenReturn(pet);

    mockMvc.perform(
      post("/pet/salvar")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(pet)))
        .andExpect(status().isCreated())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(pet))
    );

    verify(service, times(1)).cadastrar(pet);
  }

  @Test
  void deveExcluirPet() throws Exception {
    PetEntity pet = new PetEntity();
    pet.setId(1L);

    mockMvc.perform(
      delete("/pet/excluir")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(pet)))
        .andExpect(status().isNoContent()
    );

    verify(service, times(1)).excluir(pet);
  }

  @Test
  void deveListarPets() throws Exception {
    FilterDTO<PetEntity> filtro = new FilterDTO<>();
    filtro.setPage(1);
    filtro.setQtd(10);

    List<PetEntity> pets = new ArrayList<>();
    pets.add(new PetEntity());
    pets.add(new PetEntity());

    when(service.listar(filtro)).thenReturn(pets);

    mockMvc.perform(
      post("/pet/listar")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(filtro)))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(pets))
    );

    verify(service, times(1)).listar(filtro);
  }
}