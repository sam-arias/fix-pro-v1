package com.localMantenimiento.fixpro.person.repository;

import com.localMantenimiento.fixpro.person.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  boolean existsById(Long id);
  boolean existsByRoleName(String roleName);
  Role findByRoleName(String roleName);

  @Query("SELECT DISTINCT r FROM  Role r WHERE r.roleName != 'Cliente'")
  List<Role> findAllRoles();
}