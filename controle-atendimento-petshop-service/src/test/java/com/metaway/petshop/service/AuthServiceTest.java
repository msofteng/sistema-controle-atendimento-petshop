package com.metaway.petshop.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import java.util.*;

import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.metaway.petshop.dto.LoginDTO;
import com.metaway.petshop.entity.*;
import com.metaway.petshop.repository.*;

public class AuthServiceTest {
  @InjectMocks
  private AuthService service;

  @Mock
  private UsuarioRepository usuarioRepository;

  @Mock
  private ContatoRepository contatoRepository;

  @Mock
  private EnderecoRepository enderecoRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @Mock
  private AuthenticationManager authManager;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void deveAutenticarUsuario() {
    LoginDTO input = new LoginDTO();
    input.setNomeCpf("teste");
    input.setPassword("123");

    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setNome("teste");

    when(usuarioRepository.findByNome("teste")).thenReturn(java.util.Optional.of(usuario));

    UsuarioEntity usuarioAutenticado = service.authenticate(input);

    assertNotNull(usuarioAutenticado);
    assertEquals(usuario.getNome(), usuarioAutenticado.getNome());
  }

  @Test
  void deveCadastrarUsuario() {
    UsuarioEntity usuario = new UsuarioEntity();
    usuario.setNome("teste");
    usuario.setPassword("123");

    List<ContatoEntity> contatos = new ArrayList<>();
    contatos.add(new ContatoEntity());
    usuario.setContatos(contatos);

    List<EnderecoEntity> enderecos = new ArrayList<>();
    enderecos.add(new EnderecoEntity());
    usuario.setEnderecos(enderecos);

    when(passwordEncoder.encode("123")).thenReturn("senhaEncriptada");
    when(usuarioRepository.save(usuario)).thenReturn(usuario);

    UsuarioEntity usuarioCadastrado = service.register(usuario);

    assertNotNull(usuarioCadastrado);
    assertEquals(usuario.getNome(), usuarioCadastrado.getNome());
    assertEquals("senhaEncriptada", usuarioCadastrado.getPassword());
  }
}