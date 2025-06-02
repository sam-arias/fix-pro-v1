package com.localMantenimiento.fixpro.spare_part.repository;

import com.localMantenimiento.fixpro.spare_part.model.BrandSparePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandSparePartRepository extends JpaRepository<BrandSparePart, Long> {
  boolean existsById(Long id);
  boolean existsByBrandName(String name);
  Optional<BrandSparePart> findByBrandName(String name);
}
