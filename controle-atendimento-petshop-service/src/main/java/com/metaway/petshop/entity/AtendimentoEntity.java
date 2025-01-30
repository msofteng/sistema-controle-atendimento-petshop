package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.GenerationType.IDENTITY;

import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

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
  private LocalDate data;

  @ManyToMany
  @JoinTable(
    name = "atendimentos_pet",
    joinColumns = @JoinColumn(name = "atendimento_id"),
    inverseJoinColumns = @JoinColumn(name = "pet_id")
  )
  @JsonIgnoreProperties("pets")
  private Set<PetEntity> pets;  
}