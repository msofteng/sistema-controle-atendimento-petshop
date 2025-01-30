package com.metaway.petshop.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@DiscriminatorValue("ADMIN")
@EqualsAndHashCode(callSuper=false)
public class FuncionarioEntity extends UsuarioEntity {}