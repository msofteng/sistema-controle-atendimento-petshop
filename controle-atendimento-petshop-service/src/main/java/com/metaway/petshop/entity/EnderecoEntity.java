package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.GenerationType.IDENTITY;

import jakarta.annotation.Nullable;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

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