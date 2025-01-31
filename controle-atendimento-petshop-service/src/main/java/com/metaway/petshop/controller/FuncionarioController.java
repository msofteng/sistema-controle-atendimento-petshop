package com.metaway.petshop.controller;

import static org.springframework.http.HttpStatus.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.metaway.petshop.entity.FuncionarioEntity;
import com.metaway.petshop.service.FuncionarioService;

@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {
  @Autowired
  private FuncionarioService service;

  @PostMapping("/salvar")
  @ResponseStatus(CREATED)
  public FuncionarioEntity salvarFuncionario(@RequestBody FuncionarioEntity funcionario) {
    return service.cadastrar(funcionario);
  }

  @DeleteMapping("/excluir")
  @ResponseStatus(NO_CONTENT)
  public void excluirFuncionario(@RequestBody FuncionarioEntity funcionario) {
    service.excluir(funcionario);
  }
}