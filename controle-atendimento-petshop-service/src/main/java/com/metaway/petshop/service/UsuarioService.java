package com.metaway.petshop.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.*;
import com.metaway.petshop.repository.*;

import jakarta.transaction.Transactional;

@Service
public class UsuarioService {
  @Autowired
  private UsuarioRepository repository;

  @Autowired
  private ContatoRepository contatoRepository;

  @Autowired
  private EnderecoRepository enderecoRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public UsuarioEntity cadastrar(UsuarioEntity cliente) {
    if (cliente.getId() != null && cliente.getId() > 0) {
      Optional<UsuarioEntity> clienteEncontrado = repository.findById(cliente.getId());

      if (clienteEncontrado.isPresent() && !cliente.getPassword().equals("")) {
        cliente.setPassword(passwordEncoder.encode(cliente.getPassword()));
      } else {
        cliente.setPassword(clienteEncontrado.get().getPassword());
      }
    }

    if (cliente.getContatos() != null && !cliente.getContatos().isEmpty()) {
      cliente.setContatos(contatoRepository.saveAll(cliente.getContatos().stream().map(contato -> {
        contato.setCliente(cliente);
        return contato;
      }).collect(Collectors.toList())));
    }

    if (cliente.getContatos() != null && !cliente.getContatos().isEmpty()) {
      cliente.setEnderecos(enderecoRepository.saveAll(cliente.getEnderecos().stream().map(endereco -> {
        endereco.setCliente(cliente);
        return endereco;
      }).collect(Collectors.toList())));
    }
    
    return repository.save(cliente);
  }

  @Transactional
  public void excluir(UsuarioEntity cliente) {
    repository.removerAtendimentosPetsUsuario(cliente.getId());
    repository.removerRacasPetsUsuario(cliente.getId());
    repository.removerPetsUsuario(cliente.getId());
    repository.removerContatosUsuario(cliente.getId());
    repository.removerEnderecosUsuario(cliente.getId());
    repository.removerUsuario(cliente.getId());
  }

  public List<UsuarioEntity> listar(FilterDTO<UsuarioEntity> filter) {
    if (filter == null) {
      filter = new FilterDTO<UsuarioEntity>();
    }

    filter.setPage(filter.getPage() != null && filter.getPage() >= 1 ? filter.getPage() : 1);
    filter.setQtd(filter.getQtd() != null && filter.getQtd() >= 1 ? filter.getQtd() : Integer.parseInt(Long.toString(repository.count() > 0 ? repository.count() : 10)));

    // implementar os filtros no front-end e buscar aqui com filter.getFilter() em uma consulta personalizada no repositório JPA

    return repository.findAll(PageRequest.of(filter.getPage() - 1, filter.getQtd())).getContent().stream().map(user -> {
      user.setPassword(null);
      return user;
    }).toList();
  }

  public void removerContato(ContatoEntity contato) {
    if (contato.getId() != null) contatoRepository.deleteById(contato.getId());
  }

  public void removerEndereco(EnderecoEntity endereco) {
    if (endereco.getId() != null) enderecoRepository.deleteById(endereco.getId());
  }
}