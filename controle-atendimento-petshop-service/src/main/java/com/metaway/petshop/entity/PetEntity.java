package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.GenerationType.IDENTITY;
import static jakarta.persistence.FetchType.LAZY;

import java.time.LocalDate;
import java.util.Set;

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

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate dataNascimento;

  @Column(columnDefinition = "TEXT", nullable = true)
  private String foto;

  @ManyToOne(cascade = ALL, fetch = LAZY)
  @JsonIgnoreProperties(value = "pets", allowSetters = true)
  private ClienteEntity cliente;

  @ManyToMany(cascade = ALL)
  @JoinTable(
    name = "racas_pet",
    joinColumns = @JoinColumn(name = "pet_id"),
    inverseJoinColumns = @JoinColumn(name = "raca_id")
  )
  @JsonIgnoreProperties(value = "pets", allowSetters = true)
  private Set<RacaEntity> raca;
}