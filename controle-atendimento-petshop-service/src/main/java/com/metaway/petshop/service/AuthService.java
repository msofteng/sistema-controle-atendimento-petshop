package com.metaway.petshop.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.metaway.petshop.dto.LoginDTO;
import com.metaway.petshop.entity.UsuarioEntity;
import com.metaway.petshop.repository.*;

import jakarta.transaction.Transactional;

@Service
public class AuthService {
  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private ContatoRepository contatoRepository;

  @Autowired
  private EnderecoRepository enderecoRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private AuthenticationManager authManager;

  public UsuarioEntity authenticate(LoginDTO input) {
    authManager.authenticate(new UsernamePasswordAuthenticationToken(input.getNomeCpf(), input.getPassword()));

    return usuarioRepository.findByNome((String) input.getNomeCpf()).orElseThrow();
  }

  @Transactional
  public UsuarioEntity register(UsuarioEntity usuario) {
    usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

    if (usuario.getContatos() != null && !usuario.getContatos().isEmpty()) {
      usuario.setContatos(contatoRepository.saveAll(usuario.getContatos().stream().map(contato -> {
        contato.setCliente(usuario);
        return contato;
      }).collect(Collectors.toList())));
    }

    if (usuario.getEnderecos() != null && !usuario.getEnderecos().isEmpty()) {
      usuario.setEnderecos(enderecoRepository.saveAll(usuario.getEnderecos().stream().map(endereco -> {
        endereco.setCliente(usuario);
        return endereco;
      }).collect(Collectors.toList())));
    }

    return usuarioRepository.save(usuario);
  }
}