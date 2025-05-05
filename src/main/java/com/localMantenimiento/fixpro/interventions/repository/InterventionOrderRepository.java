package com.localMantenimiento.fixpro.interventions.repository;

import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterventionOrderRepository extends JpaRepository<InterventionOrder, Long> {
  boolean existsInterventionDetailsById(Long id);

  Optional<List<InterventionOrder>> findByInterventionStatus(String interventionStatus);
}