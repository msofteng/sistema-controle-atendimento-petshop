package com.metaway.petshop.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.*;
import com.metaway.petshop.service.ClienteService;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
  @Autowired
  private ClienteService service;

  @PostMapping("/salvar")
  @ResponseStatus(CREATED)
  public ClienteEntity salvarCliente(@RequestBody ClienteEntity cliente) {
    return service.cadastrar(cliente);
  }

  @DeleteMapping("/excluir")
  @ResponseStatus(NO_CONTENT)
  public void excluirCliente(@RequestBody ClienteEntity cliente) {
    service.excluir(cliente);
  }

  @DeleteMapping("/contato/excluir")
  @ResponseStatus(NO_CONTENT)
  public void excluirContato(@RequestBody ContatoEntity contato) {
    service.removerContato(contato);
  }

  @DeleteMapping("/endereco/excluir")
  @ResponseStatus(NO_CONTENT)
  public void excluirEndereco(@RequestBody EnderecoEntity endereco) {
    service.removerEndereco(endereco);
  }

  @PostMapping("/listar")
  @ResponseStatus(OK)
  public List<ClienteEntity> listarClientes(@RequestBody FilterDTO<ClienteEntity> filtro) {
    return service.listar(filtro);
  }
}