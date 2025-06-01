package com.localMantenimiento.fixpro.person.repository;

import com.localMantenimiento.fixpro.person.model.Person;
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
  @Query("SELECT p FROM Person p JOIN p.role r WHERE (p.availability != 'desactivado' OR p.availability IS NULL)AND r.id = :roleId")
  List<Person> findPersonByRoleId(@Param("roleId") Long roleId);

  @Query("SELECT DISTINCT p FROM Person p JOIN FETCH p.role r JOIN p.specialties s " +
      "WHERE p.availability != 'desactivado' AND r.id = :roleId AND s.id = :specialtyId")
  List<Person> findByRoleIdAndSpecialtiesId(
      @Param("roleId") Long roleId,
      @Param("specialtyId") Long specialtyId);

  @Query("SELECT DISTINCT  p FROM  Person p JOIN FETCH p.role r WHERE r.roleName != 'Cliente' AND p.id != :personId  AND p.availability != 'Desactivado'")
  List<Person> findStaff(@Param("personId") Long personId);
}