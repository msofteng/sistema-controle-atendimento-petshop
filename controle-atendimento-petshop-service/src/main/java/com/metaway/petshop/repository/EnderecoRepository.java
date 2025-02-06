package com.metaway.petshop.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.metaway.petshop.entity.EnderecoEntity;

@Repository
public interface EnderecoRepository extends JpaRepository<EnderecoEntity, Long> {
  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM ENDERECO_ENTITY WHERE ID = :enderecoId")
  void removerEndereco(@Param("enderecoId") Long enderecoId);
}