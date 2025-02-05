package com.metaway.petshop.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.http.MediaType.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.*;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.metaway.petshop.dto.LoginDTO;
import com.metaway.petshop.entity.UsuarioEntity;
import com.metaway.petshop.service.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private JwtService jwtService;

  @MockitoBean
  private AuthService service;

  @Test
  void deveCadastrarUsuario() throws Exception {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setNome("Teste");

    when(service.register(usuario)).thenReturn(usuario);

    mockMvc.perform(
      post("/auth/signup")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(usuario))
    )
      .andExpect(status().isCreated());

    verify(service, times(0)).register(usuario);
  }

  @Test
  void deveAutenticarUsuario() throws Exception {
    LoginDTO loginUserDto = new LoginDTO();
    loginUserDto.setNomeCpf("teste");
    loginUserDto.setPassword("123");

    when(service.authenticate(loginUserDto)).thenReturn(new UsuarioEntity());
    when(jwtService.generateToken(any(UsuarioEntity.class))).thenReturn("token");

    mockMvc.perform(
      post("/auth/login")
        .contentType(APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(loginUserDto))
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(APPLICATION_JSON))
      .andExpect(jsonPath("$.token").value("token"));

    verify(service, times(1)).authenticate(loginUserDto);
  }

  @Test
  void deveObterUsuarioAutenticado() throws Exception {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setNome("Teste");
    usuario.setPassword("teste");

    SecurityContext securityContext = mock(SecurityContext.class);
    when(securityContext.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(usuario, null));
    SecurityContextHolder.setContext(securityContext);

    mockMvc.perform(
      get("/auth/me"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(usuario))
    );
  }
}