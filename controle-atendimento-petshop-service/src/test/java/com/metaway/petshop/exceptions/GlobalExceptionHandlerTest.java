package com.metaway.petshop.exceptions;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.*;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;

public class GlobalExceptionHandlerTest {
  @InjectMocks
  private GlobalExceptionHandler handler;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void deveTratarBadCredentialsException() {
    BadCredentialsException exception = new BadCredentialsException("Usuário ou senha incorretos");

    ProblemDetail errorDetail = handler.handleSecurityException(exception);

    assertNotNull(errorDetail);
    assertEquals(401, errorDetail.getStatus());
    assertEquals("O nome de usuário ou senha está incorreto", errorDetail.getProperties().get("message"));
  }

  @Test
  void deveTratarAccountStatusException() {
    AccountStatusException exception = new AccountStatusExceptionImpl("Conta bloqueada", null);

    ProblemDetail errorDetail = handler.handleSecurityException(exception);

    assertNotNull(errorDetail);
    assertEquals(401, errorDetail.getStatus());
    assertEquals("A conta está bloqueada", errorDetail.getProperties().get("message"));
  }

  private class AccountStatusExceptionImpl extends AccountStatusException {
    public AccountStatusExceptionImpl(String msg, Throwable cause) {
      super(msg, cause);
    }
  }

  @Test
  void deveTratarAccessDeniedException() {
    AccessDeniedException exception = new AccessDeniedException("Acesso negado");

    ProblemDetail errorDetail = handler.handleSecurityException(exception);

    assertNotNull(errorDetail);
    assertEquals(401, errorDetail.getStatus());
    assertEquals("Você não está autorizado a acessar este recurso", errorDetail.getProperties().get("message"));
  }

  @Test
  void deveTratarSignatureException() {
    SignatureException exception = new SignatureException("Assinatura JWT inválida");

    ProblemDetail errorDetail = handler.handleSecurityException(exception);

    assertNotNull(errorDetail);
    assertEquals(401, errorDetail.getStatus());
    assertEquals("A assinatura do JWT é inválida", errorDetail.getProperties().get("message"));
  }

  @Test
  void deveTratarExpiredJwtException() {
    ExpiredJwtException exception = new ExpiredJwtException(null, null, "Token JWT expirado");

    ProblemDetail errorDetail = handler.handleSecurityException(exception);

    assertNotNull(errorDetail);
    assertEquals(401, errorDetail.getStatus());
    assertEquals("O token JWT expirou", errorDetail.getProperties().get("message"));
  }

  @Test
  void deveTratarExceptionGenerica() {
    Exception exception = new Exception("Erro interno do servidor");

    ProblemDetail errorDetail = handler.handleSecurityException(exception);

    assertNotNull(errorDetail);
    assertEquals(500, errorDetail.getStatus());
    assertEquals("Erro desconhecido do servidor interno.", errorDetail.getProperties().get("message"));
  }
}