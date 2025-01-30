package com.metaway.petshop.dto;

import lombok.Data;

@Data
public class FilterDTO<T> {
  private Integer page;
  private Integer qtd;
  private T filter;
}