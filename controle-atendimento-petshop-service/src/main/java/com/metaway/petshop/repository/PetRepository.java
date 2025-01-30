package com.metaway.petshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.metaway.petshop.entity.PetEntity;

@Repository
public interface PetRepository extends JpaRepository<PetEntity, Long> {}