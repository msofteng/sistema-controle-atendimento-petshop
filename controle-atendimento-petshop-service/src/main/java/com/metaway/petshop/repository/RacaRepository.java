package com.metaway.petshop.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.metaway.petshop.entity.RacaEntity;

@Repository
public interface RacaRepository extends JpaRepository<RacaEntity, Long> {
  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM RACAS_PET WHERE RACA_ID = :racaId")
  void removerRacaPet(@Param("racaId") Long racaId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM RACA_ENTITY WHERE ID = :racaId")
  void excluirRaca(@Param("racaId") Long racaId);
}