package com.localMantenimiento.fixpro.spare_part.repository;

import com.localMantenimiento.fixpro.spare_part.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {
  boolean existsById(Long id);
  Optional<Type> findByTypeName(String name);
  boolean existsByTypeName(String name);

}
