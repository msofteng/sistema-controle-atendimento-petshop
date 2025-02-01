package com.metaway.petshop.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.*;
import com.metaway.petshop.repository.*;

import jakarta.transaction.Transactional;

@Service
public class ClienteService {
  @Autowired
  private ClienteRepository repository;

  @Autowired
  private ContatoRepository contatoRepository;

  @Autowired
  private EnderecoRepository enderecoRepository;

  public ClienteEntity cadastrar(ClienteEntity cliente) {
    cliente.setContatos(contatoRepository.saveAll(cliente.getContatos().stream().map(contato -> {
      contato.setCliente(cliente);
      return contato;
    }).collect(Collectors.toList())));

    cliente.setEnderecos(enderecoRepository.saveAll(cliente.getEnderecos().stream().map(endereco -> {
      endereco.setCliente(cliente);
      return endereco;
    }).collect(Collectors.toList())));
    
    return repository.save(cliente);
  }

  @Transactional
  public void excluir(ClienteEntity cliente) {
    repository.removerAtendimentosPetsCliente(cliente.getId());
    repository.removerRacasPetsCliente(cliente.getId());
    repository.removerPetsCliente(cliente.getId());
    repository.removerContatosCliente(cliente.getId());
    repository.removerEnderecosCliente(cliente.getId());
    repository.removerCliente(cliente.getId());
  }

  public List<ClienteEntity> listar(FilterDTO<ClienteEntity> filter) {
    filter.setPage(filter.getPage() != null && filter.getPage() >= 1 ? filter.getPage() : 1);
    filter.setQtd(filter.getQtd() != null && filter.getQtd() >= 1 ? filter.getQtd() : Integer.parseInt(Long.toString(repository.count() > 0 ? repository.count() : 10)));

    // implementar os filtros no front-end e buscar aqui com filter.getFilter() em uma consulta personalizada no repositório JPA

    return repository.findAll(PageRequest.of(filter.getPage() - 1, filter.getQtd())).getContent();
  }
}