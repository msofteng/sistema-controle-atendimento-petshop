package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.GenerationType.IDENTITY;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@JsonInclude(NON_EMPTY)
public class RacaEntity {
  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;
  private String descricao;

  @ManyToMany(mappedBy = "racas")
  @JsonIgnoreProperties("racas")
  private Set<PetEntity> pets;
}