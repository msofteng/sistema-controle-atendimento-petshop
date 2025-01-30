package com.metaway.petshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.metaway.petshop.entity.AtendimentoEntity;

@Repository
public interface AtendimentoRepository extends JpaRepository<AtendimentoEntity, Long> {}