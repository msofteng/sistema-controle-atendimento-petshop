package com.metaway.petshop.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.metaway.petshop.entity.PetEntity;

@Repository
public interface PetRepository extends JpaRepository<PetEntity, Long> {
  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM ATENDIMENTOS_PET WHERE PET_ID = :petId")
  void removerAtendimentosPet(@Param("petId") Long petId);
  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM RACAS_PET WHERE PET_ID = :petId")
  void removerRacasPet(@Param("petId") Long petId);
  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM PET_ENTITY WHERE ID = :petId")
  void excluirPet(@Param("petId") Long petId);
}