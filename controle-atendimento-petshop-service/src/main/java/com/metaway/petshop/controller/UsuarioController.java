package com.metaway.petshop.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.metaway.petshop.dto.FilterDTO;
import com.metaway.petshop.entity.*;
import com.metaway.petshop.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
  @Autowired
  private UsuarioService service;

  @PostMapping("/salvar")
  @ResponseStatus(CREATED)
  public UsuarioEntity salvarCliente(@RequestBody UsuarioEntity cliente) {
    return service.cadastrar(cliente);
  }

  @DeleteMapping("/excluir")
  @ResponseStatus(NO_CONTENT)
  public void excluirCliente(@RequestBody UsuarioEntity cliente) {
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
  public List<UsuarioEntity> listarClientes(@RequestBody FilterDTO<UsuarioEntity> filtro) {
    return service.listar(filtro);
  }
}