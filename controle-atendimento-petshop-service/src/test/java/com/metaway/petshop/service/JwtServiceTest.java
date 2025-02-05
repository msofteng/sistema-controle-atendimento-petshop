package com.metaway.petshop.service;

import static org.junit.jupiter.api.Assertions.*;

import java.lang.reflect.Field;

import org.junit.jupiter.api.*;
import org.mockito.*;

import com.metaway.petshop.entity.UsuarioEntity;

import io.jsonwebtoken.Claims;

public class JwtServiceTest {
  @InjectMocks
  private JwtService service;

  @Mock
  private Claims claims;

  UsuarioEntity usuario;

  @BeforeEach
  void setUp() throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException {
    MockitoAnnotations.openMocks(this);

    Field secretKeyField = service.getClass().getDeclaredField("secretKey");
    secretKeyField.setAccessible(true);
    secretKeyField.set(service, "20cbe5ccca2276495b9aa9fa14b6d0b8afbcb7e5d5b2c2c5099288a028fa0d8d");

    Field expirationField = service.getClass().getDeclaredField("jwtExpiration");
    expirationField.setAccessible(true);
    expirationField.set(service, 3600000L);

    usuario = new UsuarioEntity();

    usuario.setNome("pedro");
    usuario.setPassword("teste");
  }

  @Test
  void deveGerarValidarToken() {
    String token = service.generateToken(usuario);

    assertNotNull(token);

    boolean isValid = service.isTokenValid(token, usuario);

    assertTrue(isValid);
  }

  @Test
  void deveObterTempoDeExpiracao() {
    long expirationTime = service.getExpirationTime();

    assertNotNull(expirationTime);
  }

  @Test
  void deveGerarValidarTokenInvalido() {
    String token = service.generateToken(usuario);

    usuario.setNome("lucas");

    assertNotNull(token);

    boolean isValid = service.isTokenValid(token, usuario);

    assertFalse(isValid);
  }
}