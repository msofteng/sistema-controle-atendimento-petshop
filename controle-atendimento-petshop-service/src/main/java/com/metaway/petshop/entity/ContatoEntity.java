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
public class ContatoEntity {
  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;
  private String tag;
  private String tipo;
  private String valor;

  @ManyToOne
  @JsonIgnoreProperties("contatos")
  private ClienteEntity cliente;
}