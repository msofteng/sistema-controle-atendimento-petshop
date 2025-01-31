package com.metaway.petshop.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.RacaEntity;
import com.metaway.petshop.service.RacaService;

@RestController
@RequestMapping("/raca")
public class RacaController {
  @Autowired
  private RacaService service;

  @PostMapping("/salvar")
  @ResponseStatus(CREATED)
  public RacaEntity salvarRaca(@RequestBody RacaEntity raca) {
    return service.cadastrar(raca);
  }

  @DeleteMapping("/excluir")
  @ResponseStatus(NO_CONTENT)
  public void excluirRaca(@RequestBody RacaEntity raca) {
    service.excluir(raca);
  }

  @PostMapping("/listar")
  @ResponseStatus(OK)
  public List<RacaEntity> listarRacas(@RequestBody FilterDTO<RacaEntity> filtro) {
    return service.listar(filtro);
  }
}