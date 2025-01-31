package com.metaway.petshop.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.AtendimentoEntity;
import com.metaway.petshop.service.AtendimentoService;

@RestController
@RequestMapping("/atendimento")
public class AtendimentoController {
  @Autowired
  private AtendimentoService service;

  @PostMapping("/salvar")
  @ResponseStatus(CREATED)
  public AtendimentoEntity salvarAtendimento(@RequestBody AtendimentoEntity atendimento) {
    return service.cadastrar(atendimento);
  }

  @DeleteMapping("/excluir")
  @ResponseStatus(NO_CONTENT)
  public void excluirAtendimento(@RequestBody AtendimentoEntity atendimento) {
    service.excluir(atendimento);
  }

  @PostMapping("/listar")
  @ResponseStatus(OK)
  public List<AtendimentoEntity> listarAtendimentos(@RequestBody FilterDTO<AtendimentoEntity> filtro) {
    return service.listar(filtro);
  }
}