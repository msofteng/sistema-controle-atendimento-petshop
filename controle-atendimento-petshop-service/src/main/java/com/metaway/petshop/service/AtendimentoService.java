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
  private UsuarioRepository usuarioRepository;

  @Autowired
  private ContatoRepository contatoRepository;

  @Autowired
  private EnderecoRepository enderecoRepository;

  @Autowired
  private PetRepository petRepository;

  @Autowired
  private RacaRepository racaRepository;

  @Transactional
  public AtendimentoEntity cadastrar(AtendimentoEntity atendimento) {
    UsuarioEntity cliente = atendimento.getPets().iterator().next().getCliente();

    if (cliente != null) {
      if (cliente.getId() == null) {
        cliente = usuarioRepository.save(cliente);
      } else {
        cliente = usuarioRepository.findById(cliente.getId()).orElse(cliente);
      }
    }

    final var cli = cliente;

    if (cli != null && cli.getContatos() != null && !cli.getContatos().isEmpty()) {
      cli.setContatos(contatoRepository.saveAll(cli.getContatos().stream().map(contato -> {
        contato.setCliente(cli);
        return contato;
      }).collect(Collectors.toList())));
    }

    if (cli != null && cli.getEnderecos() != null && !cli.getEnderecos().isEmpty()) {
      cli.setEnderecos(enderecoRepository.saveAll(cli.getEnderecos().stream().map(endereco -> {
        endereco.setCliente(cli);
        return endereco;
      }).collect(Collectors.toList())));
    }

    atendimento.setPets(atendimento.getPets().stream().map(pet -> {
      if (pet.getId() != null) {
        pet = petRepository.findById(pet.getId()).orElse(pet);
      }

      if (pet.getRaca() != null && !pet.getRaca().isEmpty()) {
        pet.setRaca(pet.getRaca().stream().map(raca -> {
          if (raca.getId() != null) {
            return racaRepository.findById(raca.getId()).orElse(raca);
          } else {
            return racaRepository.save(raca);
          }
        }).collect(Collectors.toSet()));
      }
      
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