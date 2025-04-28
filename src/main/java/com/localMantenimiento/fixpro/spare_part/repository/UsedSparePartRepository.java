package com.localMantenimiento.fixpro.spare_part.repository;

import com.localMantenimiento.fixpro.spare_part.model.UsedSparePart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsedSparePartRepository extends JpaRepository<UsedSparePart, Integer> {
}
