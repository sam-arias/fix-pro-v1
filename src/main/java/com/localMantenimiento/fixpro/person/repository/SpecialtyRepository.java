package com.localMantenimiento.fixpro.person.repository;

import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialty, Long> {
  boolean existsById(Long id);
  boolean existsBySpecialtyName(String specialtyName);

  Specialty findSpecialtyBySpecialtyName(String specialtyName);

  @Query("SELECT s.people FROM Specialty s WHERE s.id = :specialtyId")
  Optional<List<Person>> findPeopleBySpecialtyId(@Param("specialtyId") Long specialtyId);
}