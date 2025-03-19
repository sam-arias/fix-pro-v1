package com.localMantenimiento.fixpro.Repository;

import com.localMantenimiento.fixpro.Entity.Person;
import com.localMantenimiento.fixpro.Entity.PersonRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
  boolean existsByEmail(String email);
  boolean existsById(Long personId);

  List<Person> email(String email);

  Optional<Person> findByEmail(String email);

  Optional<List<Person>> findByRole(PersonRole role);

  Optional<List<Person>> findBySpecialty(String specialty);
}
