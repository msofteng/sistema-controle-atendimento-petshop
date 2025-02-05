package com.metaway.petshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.RacaEntity;
import com.metaway.petshop.repository.RacaRepository;

import jakarta.transaction.Transactional;

@Service
public class RacaService {
  @Autowired
  private RacaRepository repository;

  public RacaEntity cadastrar(RacaEntity raca) {
    return repository.save(raca);
  }

  @Transactional
  public void excluir(RacaEntity raca) {
    repository.removerRacaPet(raca.getId());
    repository.excluirRaca(raca.getId());
  }

  public List<RacaEntity> listar(FilterDTO<RacaEntity> filter) {
    if (filter == null) {
      filter = new FilterDTO<RacaEntity>();
    }

    filter.setPage(filter.getPage() != null && filter.getPage() >= 1 ? filter.getPage() : 1);
    filter.setQtd(filter.getQtd() != null && filter.getQtd() >= 1 ? filter.getQtd() : Integer.parseInt(Long.toString(repository.count() > 0 ? repository.count() : 10)));

    // implementar os filtros no front-end e buscar aqui com filter.getFilter() em uma consulta personalizada no repositório JPA

    return repository.findAll(PageRequest.of(filter.getPage() - 1, filter.getQtd())).getContent();
  }
}