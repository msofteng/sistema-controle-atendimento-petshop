package com.metaway.petshop.controller;

import static org.springframework.http.HttpStatus.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.metaway.petshop.dto.LoginDTO;
import com.metaway.petshop.entity.UsuarioEntity;
import com.metaway.petshop.response.LoginResponse;
import com.metaway.petshop.service.*;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  private JwtService jwtService;

  @Autowired
  private AuthService service;

  @PostMapping("/signup")
  @ResponseStatus(CREATED)
  public UsuarioEntity cadastrar(@RequestBody UsuarioEntity funcionario) {
    return service.register(funcionario);
  }

  @PostMapping("/login")
  @ResponseStatus(OK)
  public LoginResponse authenticate(@RequestBody LoginDTO loginUserDto) {
    return new LoginResponse() {{
      setToken(jwtService.generateToken(service.authenticate(loginUserDto)));
      setExpiresIn(jwtService.getExpirationTime());
    }};
  }

  @GetMapping("/me")
  @ResponseStatus(OK)
  public UsuarioEntity authenticatedUser() {
    return (UsuarioEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}