package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.GenerationType.IDENTITY;

import java.time.LocalDate;
import java.util.Set;

import jakarta.annotation.Nullable;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@JsonInclude(NON_EMPTY)
public class PetEntity {
  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;
  private String nome;
  private LocalDate dataNascimento;

  @Nullable
  private String foto;

  @ManyToOne
  @JsonIgnoreProperties("pets")
  private ClienteEntity cliente;

  @ManyToMany
  @JoinTable(
    name = "racas_pet",
    joinColumns = @JoinColumn(name = "pet_id"),
    inverseJoinColumns = @JoinColumn(name = "raca_id")
  )
  @JsonIgnoreProperties("pets")
  private Set<RacaEntity> racas;

  @ManyToMany(mappedBy = "pets")
  @JsonIgnoreProperties("pets")
  private Set<AtendimentoEntity> atendimentos;
}