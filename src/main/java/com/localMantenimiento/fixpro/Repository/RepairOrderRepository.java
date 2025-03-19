package com.localMantenimiento.fixpro.Repository;

import com.localMantenimiento.fixpro.Entity.RepairOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepairOrderRepository extends JpaRepository<RepairOrder, Long> {
}
