package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.GenerationType.IDENTITY;

import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@JsonInclude(NON_EMPTY)
public class AtendimentoEntity {
  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;
  private String descricao;
  private Double valor;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate data;

  @ManyToMany(cascade = ALL)
  @JoinTable(
    name = "atendimentos_pet",
    joinColumns = @JoinColumn(name = "atendimento_id"),
    inverseJoinColumns = @JoinColumn(name = "pet_id")
  )
  @JsonIgnoreProperties(value = "atendimentos", allowSetters = true)
  private Set<PetEntity> pets;
}