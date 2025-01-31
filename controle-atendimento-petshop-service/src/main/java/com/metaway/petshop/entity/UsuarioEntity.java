package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.DiscriminatorType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;
import static jakarta.persistence.InheritanceType.SINGLE_TABLE;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@JsonInclude(NON_EMPTY)
@Inheritance(strategy = SINGLE_TABLE)
@DiscriminatorColumn(name = "perfil", discriminatorType = STRING)
public abstract class UsuarioEntity {
  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;
  private String nome;
  private String senha;

  @Column(nullable = true)
  private Long cpf;

  @Column(columnDefinition = "TEXT", nullable = true)
  private String foto;
}