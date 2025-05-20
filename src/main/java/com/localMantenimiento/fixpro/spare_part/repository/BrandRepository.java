package com.localMantenimiento.fixpro.spare_part.repository;

import com.localMantenimiento.fixpro.spare_part.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
  boolean existsById(Long id);
  boolean existsByBrandName(String name);
  Optional<Brand> findByBrandName(String name);
}
