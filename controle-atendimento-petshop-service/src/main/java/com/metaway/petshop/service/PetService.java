package com.metaway.petshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.PetEntity;
import com.metaway.petshop.repository.PetRepository;

import jakarta.transaction.Transactional;

@Service
public class PetService {
  @Autowired
  private PetRepository repository;

  public PetEntity cadastrar(PetEntity pet) {
    return repository.save(pet);
  }

  @Transactional
  public void excluir(PetEntity pet) {
    repository.removerAtendimentosPet(pet.getId());
    repository.removerRacasPet(pet.getId());
    repository.excluirPet(pet.getId());
  }

  public List<PetEntity> listar(FilterDTO<PetEntity> filter) {
    if (filter == null) {
      filter = new FilterDTO<PetEntity>();
    }

    filter.setPage(filter.getPage() != null && filter.getPage() >= 1 ? filter.getPage() : 1);
    filter.setQtd(filter.getQtd() != null && filter.getQtd() >= 1 ? filter.getQtd() : Integer.parseInt(Long.toString(repository.count() > 0 ? repository.count() : 10)));

    // implementar os filtros no front-end e buscar aqui com filter.getFilter() em uma consulta personalizada no repositório JPA

    return repository.findAll(PageRequest.of(filter.getPage() - 1, filter.getQtd())).getContent();
  }
}