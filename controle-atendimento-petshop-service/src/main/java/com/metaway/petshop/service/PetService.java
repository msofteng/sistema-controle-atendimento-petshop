package com.metaway.petshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.PetEntity;
import com.metaway.petshop.repository.PetRepository;

@Service
public class PetService {
  @Autowired
  private PetRepository repository;

  public PetEntity cadastrar(PetEntity pet) {
    return repository.save(pet);
  }

  public void excluir(PetEntity pet) {
    repository.deleteById(pet.getId());
  }

  public List<PetEntity> listar(FilterDTO<PetEntity> filter) {
    filter.setPage(filter.getPage() != null || filter.getPage() >= 1 ? filter.getPage() : 1);
    filter.setQtd(filter.getQtd() != null || filter.getQtd() >= 0 ? filter.getQtd() : Integer.parseInt(Long.toString(repository.count() > 0 ? repository.count() : 10)));

    // implementar os filtros no front-end e buscar aqui com filter.getFilter() em uma consulta personalizada no repositório JPA

    return repository.findAll(PageRequest.of(filter.getPage() - 1, filter.getQtd())).getContent();
  }
}