package com.localMantenimiento.fixpro.person.repository;

import com.localMantenimiento.fixpro.person.model.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialty, Long> {
  boolean existsById(Long id);
  boolean existsBySpecialtyName(String specialtyName);
}