package com.localMantenimiento.fixpro.interventions.repository;

import com.localMantenimiento.fixpro.interventions.model.InterventionDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterventionDetailsRepository extends JpaRepository<InterventionDetails, Long> {
  boolean existsInterventionDetailsById(Long id);

  @Query("SELECT od FROM InterventionDetails od WHERE od.interventionOrder.id = :orderId")
  Optional<InterventionDetails> getInterventionDetailsByOrderId(@Param("orderId") Long orderId);

  InterventionDetails getInterventionDetailsById(Long id);
}
