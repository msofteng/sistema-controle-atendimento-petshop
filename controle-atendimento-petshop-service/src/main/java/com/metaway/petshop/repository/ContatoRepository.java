package com.metaway.petshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.metaway.petshop.entity.ContatoEntity;

@Repository
public interface ContatoRepository extends JpaRepository<ContatoEntity, Long> {}