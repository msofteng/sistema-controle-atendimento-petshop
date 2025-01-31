package com.metaway.petshop.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.PetEntity;
import com.metaway.petshop.service.PetService;

@RestController
@RequestMapping("/pet")
public class PetController {
  @Autowired
  private PetService service;

  @PostMapping("/salvar")
  @ResponseStatus(CREATED)
  public PetEntity salvarPet(@RequestBody PetEntity pet) {
    return service.cadastrar(pet);
  }

  @DeleteMapping("/excluir")
  @ResponseStatus(NO_CONTENT)
  public void excluirPet(@RequestBody PetEntity pet) {
    service.excluir(pet);
  }

  @PostMapping("/listar")
  @ResponseStatus(OK)
  public List<PetEntity> listarPets(@RequestBody FilterDTO<PetEntity> filtro) {
    return service.listar(filtro);
  }
}