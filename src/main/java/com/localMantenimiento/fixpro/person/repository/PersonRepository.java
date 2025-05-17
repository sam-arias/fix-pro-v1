package com.localMantenimiento.fixpro.person.repository;

import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
  boolean existsById(Long id);
  boolean existsByEmail(String email);
  Optional<Person> findByEmail(String email);
  Optional<List<Person>> findPersonByRoleIdAndAvailabilityNot(Long roleId, String availability);
  List<Person> findByRoleIdAndSpecialtiesIdAndAvailabilityNot(Long roleId, Long specialtyId, String availability);
}