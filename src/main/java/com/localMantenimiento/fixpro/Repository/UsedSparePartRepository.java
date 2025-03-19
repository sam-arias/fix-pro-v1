package com.localMantenimiento.fixpro.Repository;

import com.localMantenimiento.fixpro.BreakTables.UsedSparePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsedSparePartRepository extends JpaRepository<UsedSparePart, Long> {
}
