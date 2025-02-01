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
public class AtendimentoService {
  @Autowired
  private AtendimentoRepository repository;

  @Autowired
  private ClienteRepository clienteRepository;

  @Autowired
  private ContatoRepository contatoRepository;

  @Autowired
  private EnderecoRepository enderecoRepository;

  @Autowired
  private PetRepository petRepository;

  @Transactional
  public AtendimentoEntity cadastrar(AtendimentoEntity atendimento) {
    ClienteEntity cliente = atendimento.getPets().iterator().next().getCliente();

    if (cliente.getId() == null) {
      cliente = clienteRepository.save(cliente);
    }

    final var cli = cliente;

    cliente.setContatos(cliente.getContatos().stream().map(contato -> {
      contato.setCliente(cli);
      return contato;
    }).collect(Collectors.toList()));

    cliente.setEnderecos(cliente.getEnderecos().stream().map(endereco -> {
      endereco.setCliente(cli);
      return endereco;
    }).collect(Collectors.toList()));

    contatoRepository.saveAll(cliente.getContatos());
    enderecoRepository.saveAll(cliente.getEnderecos());

    atendimento.setPets(petRepository.saveAll(atendimento.getPets()).stream().map(pet -> {
      pet.setCliente(cli);
      return pet;
    }).collect(Collectors.toSet()));

    return repository.save(atendimento);
  }

  @Transactional
  public void excluir(AtendimentoEntity atendimento) {
    repository.removerPetsAtendimento(atendimento.getId());
    repository.removerAtendimento(atendimento.getId());
  }

  public List<AtendimentoEntity> listar(FilterDTO<AtendimentoEntity> filter) {
    filter.setPage(filter.getPage() != null && filter.getPage() >= 1 ? filter.getPage() : 1);
    filter.setQtd(filter.getQtd() != null && filter.getQtd() >= 1 ? filter.getQtd() : Integer.parseInt(Long.toString(repository.count() > 0 ? repository.count() : 10)));

    // implementar os filtros no front-end e buscar aqui com filter.getFilter() em uma consulta personalizada no repositório JPA

    return repository.findAll(PageRequest.of(filter.getPage() - 1, filter.getQtd())).getContent();
  }
}