package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.GenerationType.IDENTITY;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@JsonInclude(NON_EMPTY)
public class EnderecoEntity {
  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;
  private String logradouro;
  private String cidade;
  private String bairro;
  
  @Nullable
  private String tag;

  @Nullable
  private String complemento;

  @ManyToOne
  @JsonIgnoreProperties("enderecos")
  private ClienteEntity cliente;
}