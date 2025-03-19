package com.localMantenimiento.fixpro.Repository;

import com.localMantenimiento.fixpro.Entity.Person;
import com.localMantenimiento.fixpro.Entity.PersonRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRoleRepository extends JpaRepository<PersonRole, Long> {
  boolean existsById(Long personId);
  boolean existsByRoleIgnoreCase(String role);

  Optional<PersonRole> findByRole(String Role);
}
