package com.metaway.petshop.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@DiscriminatorValue("ADMIN")
@EqualsAndHashCode(callSuper=false)
public class FuncionarioEntity extends UsuarioEntity {}