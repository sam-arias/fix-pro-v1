package com.localMantenimiento.fixpro.Repository;

import com.localMantenimiento.fixpro.Entity.RepairDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepairDetailRepository extends JpaRepository<RepairDetail, Long> {
}
