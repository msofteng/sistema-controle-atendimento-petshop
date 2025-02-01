package com.metaway.petshop.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.metaway.petshop.entity.AtendimentoEntity;

@Repository
public interface AtendimentoRepository extends JpaRepository<AtendimentoEntity, Long> {
  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM ATENDIMENTOS_PET WHERE ATENDIMENTO_ID = :atendimentoId")
  void removerPetsAtendimento(@Param("atendimentoId") Long atendimentoId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM ATENDIMENTO_ENTITY WHERE ID = :atendimentoId")
  void removerAtendimento(@Param("atendimentoId") Long atendimentoId);
}