package com.metaway.petshop.response;

import lombok.Data;

@Data
public class LoginResponse {
  private String token;
  private long expiresIn;
}