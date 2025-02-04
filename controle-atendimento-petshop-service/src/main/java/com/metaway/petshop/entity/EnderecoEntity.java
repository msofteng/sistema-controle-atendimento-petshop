package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.GenerationType.IDENTITY;

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
  
  @Column(nullable = true)
  private String tag;

  @Column(nullable = true)
  private String complemento;

  @ManyToOne
  @JsonIgnoreProperties(value = "enderecos", allowSetters = true)
  private UsuarioEntity cliente;
}