package com.localMantenimiento.fixpro.Repository;

import com.localMantenimiento.fixpro.Entity.SparePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SparePartRepository extends JpaRepository<SparePart, Long> {
  boolean existsByName(String name);
  boolean existsById(Long personId);

  Optional<SparePart> findByName(String name);

  List<SparePart> findByBrand(String brand);
}
