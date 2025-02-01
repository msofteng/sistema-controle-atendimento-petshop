package com.metaway.petshop.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.metaway.petshop.entity.ClienteEntity;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteEntity, Long> {
  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM ATENDIMENTOS_PET WHERE PET_ID IN (SELECT ID FROM PET_ENTITY WHERE CLIENTE_ID = :clienteId)")
  void removerAtendimentosPetsCliente(@Param("clienteId") Long clienteId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM RACAS_PET WHERE PET_ID IN (SELECT ID FROM PET_ENTITY WHERE CLIENTE_ID = :clienteId)")
  void removerRacasPetsCliente(@Param("clienteId") Long clienteId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM PET_ENTITY WHERE CLIENTE_ID = :clienteId")
  void removerPetsCliente(@Param("clienteId") Long clienteId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM CONTATO_ENTITY WHERE CLIENTE_ID = :clienteId")
  void removerContatosCliente(@Param("clienteId") Long clienteId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM ENDERECO_ENTITY WHERE CLIENTE_ID = :clienteId")
  void removerEnderecosCliente(@Param("clienteId") Long clienteId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM USUARIO_ENTITY WHERE ID = :clienteId")
  void removerCliente(@Param("clienteId") Long clienteId);
}