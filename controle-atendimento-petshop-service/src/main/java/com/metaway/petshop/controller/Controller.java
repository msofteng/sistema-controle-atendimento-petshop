package com.metaway.petshop.controller;

import static org.springframework.http.HttpStatus.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teste")
public class Controller {
  @GetMapping
  @ResponseStatus(OK)
  public String index() {
    return "testando a API 2.0";
  }
}