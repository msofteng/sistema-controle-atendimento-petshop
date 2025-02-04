package com.metaway.petshop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.metaway.petshop.entity.UsuarioEntity;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {
  Optional<UsuarioEntity> findByNome(String nome);    
  
  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM ATENDIMENTOS_PET WHERE PET_ID IN (SELECT ID FROM PET_ENTITY WHERE CLIENTE_ID = :clienteId)")
  void removerAtendimentosPetsUsuario(@Param("clienteId") Long clienteId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM RACAS_PET WHERE PET_ID IN (SELECT ID FROM PET_ENTITY WHERE CLIENTE_ID = :clienteId)")
  void removerRacasPetsUsuario(@Param("clienteId") Long clienteId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM PET_ENTITY WHERE CLIENTE_ID = :clienteId")
  void removerPetsUsuario(@Param("clienteId") Long clienteId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM CONTATO_ENTITY WHERE CLIENTE_ID = :clienteId")
  void removerContatosUsuario(@Param("clienteId") Long clienteId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM ENDERECO_ENTITY WHERE CLIENTE_ID = :clienteId")
  void removerEnderecosUsuario(@Param("clienteId") Long clienteId);

  @Modifying
  @Query(nativeQuery = true, value = "DELETE FROM USUARIO_ENTITY WHERE ID = :clienteId")
  void removerUsuario(@Param("clienteId") Long clienteId);
}