package com.metaway.petshop.entity;

import static jakarta.persistence.CascadeType.ALL;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@DiscriminatorValue("CLIENTE")
@EqualsAndHashCode(callSuper=false)
public class ClienteEntity extends UsuarioEntity {
  private LocalDate dataCadastro;

  @OneToMany(mappedBy = "cliente", cascade = ALL)
  @JsonIgnoreProperties("cliente")
  private List<ContatoEntity> contatos;

  @OneToMany(mappedBy = "cliente", cascade = ALL)
  @JsonIgnoreProperties("cliente")
  private List<EnderecoEntity> enderecos;

  @OneToMany(mappedBy = "cliente", cascade = ALL)
  @JsonIgnoreProperties("cliente")
  private List<PetEntity> pets;
}