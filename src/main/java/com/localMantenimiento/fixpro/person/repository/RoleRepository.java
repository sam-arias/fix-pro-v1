package com.localMantenimiento.fixpro.person.repository;

import com.localMantenimiento.fixpro.person.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  boolean existsById(Long id);
  boolean existsByRoleName(String roleName);

  Optional<Role> findByRoleName(String roleName);
}