package com.metaway.petshop.entity;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_EMPTY;
import static jakarta.persistence.GenerationType.IDENTITY;

import java.util.Set;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@JsonInclude(NON_EMPTY)
public class RacaEntity {
  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;
  private String descricao;

  @ManyToMany(mappedBy = "raca")
  @JsonIgnoreProperties(value = "raca", allowSetters = true)
  @JsonIgnore
  private Set<PetEntity> pets;
}