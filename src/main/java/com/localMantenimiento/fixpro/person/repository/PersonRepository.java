package com.localMantenimiento.fixpro.person.repository;

import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Role;
import com.localMantenimiento.fixpro.person.model.Specialty;
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
  Optional<List<Person>> findByAddress(String address);
  Optional<List<Person>> findByPhone(String phone);

  @Query("SELECT p FROM Person p JOIN p.role r WHERE r.roleName = :roleName")
  Optional<List<Person>> findByRole(@Param("roleName") String roleName);
  @Query("SELECT p FROM Person p JOIN p.specialties s WHERE s.specialtyName = :specialtyName")
  Optional<List<Person>> findBySpecialty(@Param("specialtyName") String specialty);
  @Query("SELECT p FROM Person p JOIN p.role r JOIN p.specialties s WHERE r.roleName = :roleName AND s.specialtyName = :specialtyName")
  Optional<List<Person>> findByRoleAndSpecialty(@Param("roleName") String role, @Param("specialtyName") String specialty);
}