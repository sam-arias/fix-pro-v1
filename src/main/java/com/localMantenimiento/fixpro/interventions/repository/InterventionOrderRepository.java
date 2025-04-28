package com.localMantenimiento.fixpro.interventions.repository;

import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterventionOrderRepository extends JpaRepository<InterventionOrder, Long> {

}