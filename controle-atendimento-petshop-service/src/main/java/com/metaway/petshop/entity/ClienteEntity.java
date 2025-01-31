package com.metaway.petshop.entity;

import static jakarta.persistence.CascadeType.ALL;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@DiscriminatorValue("CLIENTE")
@EqualsAndHashCode(callSuper=false)
public class ClienteEntity extends UsuarioEntity {
  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate dataCadastro;

  @OneToMany(mappedBy = "cliente", cascade = ALL, orphanRemoval = true)
  @JsonIgnoreProperties(value = "cliente", allowSetters = true)
  private List<ContatoEntity> contatos;

  @OneToMany(mappedBy = "cliente", cascade = ALL, orphanRemoval = true)
  @JsonIgnoreProperties(value = "cliente", allowSetters = true)
  private List<EnderecoEntity> enderecos;

  @OneToMany(mappedBy = "cliente", cascade = ALL, orphanRemoval = true)
  @JsonIgnoreProperties(value = "cliente", allowSetters = true)
  private List<PetEntity> pets;
}