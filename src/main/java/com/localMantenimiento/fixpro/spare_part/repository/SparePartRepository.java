package com.localMantenimiento.fixpro.spare_part.repository;

import com.localMantenimiento.fixpro.spare_part.model.SparePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SparePartRepository extends JpaRepository<SparePart, Long> {
  Optional<List<SparePart>> findByType(String type);
  Optional<List<SparePart>> findByModel(String model);
  Optional<List<SparePart>> findByBrand(String brand);
  Optional<SparePart> findSByBrandAndTypeAndModel(String brand, String type, String model);

  boolean existsSparePartByBrandAndTypeAndModel(String brand, String type, String model);
  boolean existsById(Long id);
}