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

  public AtendimentoEntity cadastrar(AtendimentoEntity atendimento) {
    ClienteEntity cliente = clienteRepository.save(atendimento.getPets().iterator().next().getCliente());

    cliente.setContatos(contatoRepository.saveAll(cliente.getContatos().stream().map(contato -> {
      contato.setCliente(cliente);
      return contato;
    }).collect(Collectors.toList())));

    cliente.setEnderecos(enderecoRepository.saveAll(cliente.getEnderecos().stream().map(endereco -> {
      endereco.setCliente(cliente);
      return endereco;
    }).collect(Collectors.toList())));

    // Evita pets duplicados no relacionamento
    Set<PetEntity> petsValidos = atendimento.getPets().stream()
        .filter(pet -> !repository.existsByIdAndPets_Id(atendimento.getId(), pet.getId()))
        .collect(Collectors.toSet());

    if (petsValidos.size() > 0) atendimento.setPets(petsValidos);

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