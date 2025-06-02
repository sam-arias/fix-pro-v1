package com.localMantenimiento.fixpro.spare_part.repository;

import com.localMantenimiento.fixpro.spare_part.model.TypeSparePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypeSparePartRepository extends JpaRepository<TypeSparePart, Long> {
  boolean existsById(Long id);
  Optional<TypeSparePart> findByTypeName(String name);
  boolean existsByTypeName(String name);

}
