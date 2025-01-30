package com.metaway.petshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.metaway.petshop.entity.FuncionarioEntity;
import com.metaway.petshop.repository.FuncionarioRepository;

@Service
public class FuncionarioService {
  @Autowired
  private FuncionarioRepository repository;

  public FuncionarioEntity cadastrar(FuncionarioEntity funcionario) {
    return repository.save(funcionario);
  }

  public void excluir(FuncionarioEntity funcionario) {
    repository.deleteById(funcionario.getId());
  }
}