package com.localMantenimiento.fixpro.spare_part.repository;

import com.localMantenimiento.fixpro.spare_part.model.UsedSparePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsedSparePartRepository extends JpaRepository<UsedSparePart, Long> {
  boolean existsUsedSparePartById(Long id);

  @Query("SELECT usp FROM UsedSparePart  usp JOIN FETCH usp.interventionDetails id WHERE id.id = :id")
  List<UsedSparePart> findUsedSparePartByinterventionDetailsId(@Param("id") Long id);
}
