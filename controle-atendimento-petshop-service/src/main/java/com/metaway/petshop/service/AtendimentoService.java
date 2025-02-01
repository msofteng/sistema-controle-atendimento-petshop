package com.metaway.petshop.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.*;
import com.metaway.petshop.repository.*;

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

    Set<PetEntity> petsSalvos = petRepository.saveAll(atendimento.getPets()).stream().collect(Collectors.toSet());

    atendimento.setPets(petsSalvos);

    return repository.save(atendimento);
  }

  public void excluir(AtendimentoEntity atendimento) {
    repository.deleteById(atendimento.getId());
  }

  public List<AtendimentoEntity> listar(FilterDTO<AtendimentoEntity> filter) {
    filter.setPage(filter.getPage() != null && filter.getPage() >= 1 ? filter.getPage() : 1);
    filter.setQtd(filter.getQtd() != null && filter.getQtd() >= 1 ? filter.getQtd() : Integer.parseInt(Long.toString(repository.count() > 0 ? repository.count() : 10)));

    // implementar os filtros no front-end e buscar aqui com filter.getFilter() em uma consulta personalizada no repositório JPA

    return repository.findAll(PageRequest.of(filter.getPage() - 1, filter.getQtd())).getContent();
  }
}