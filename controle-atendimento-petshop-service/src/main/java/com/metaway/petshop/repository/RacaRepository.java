package com.metaway.petshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.metaway.petshop.entity.RacaEntity;

@Repository
public interface RacaRepository extends JpaRepository<RacaEntity, Long> {}