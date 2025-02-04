package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static jakarta.persistence.CascadeType.ALL;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.metaway.petshop.enums.Perfil;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@JsonInclude(NON_EMPTY)
public class UsuarioEntity {
  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;
  private String nome;
  private String senha;

  @Enumerated(EnumType.STRING)
  private Perfil perfil;

  @Column(nullable = true)
  private Long cpf;

  @Column(columnDefinition = "TEXT", nullable = true)
  private String foto;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate dataCadastro;

  @OneToMany(mappedBy = "cliente", cascade = ALL)
  @JsonIgnoreProperties(value = "cliente", allowSetters = true)
  private List<ContatoEntity> contatos;

  @OneToMany(mappedBy = "cliente", cascade = ALL)
  @JsonIgnoreProperties(value = "cliente", allowSetters = true)
  private List<EnderecoEntity> enderecos;

  @OneToMany(mappedBy = "cliente", cascade = ALL)
  @JsonIgnoreProperties(value = "cliente", allowSetters = true)
  private List<PetEntity> pets;
}