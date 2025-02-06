package com.metaway.petshop.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.metaway.petshop.entity.ContatoEntity;

@Repository
public interface ContatoRepository extends JpaRepository<ContatoEntity, Long> {
  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM CONTATO_ENTITY WHERE ID = :contatoId")
  void removerContato(@Param("contatoId") Long contatoId);
}