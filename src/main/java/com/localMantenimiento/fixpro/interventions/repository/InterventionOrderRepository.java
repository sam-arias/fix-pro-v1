package com.localMantenimiento.fixpro.interventions.repository;

import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface InterventionOrderRepository extends JpaRepository<InterventionOrder, Long> {
  boolean existsInterventionDetailsById(Long id);

  List<InterventionOrder> findByInterventionStatus(String interventionStatus);
  List<InterventionOrder> findTop5ByOrderByEntryDateDesc();
  @Query("SELECT o FROM InterventionOrder o WHERE DATE(o.entryDate) = :date")
  List<InterventionOrder> findByDay(@Param("date") LocalDate date);

  @Query("SELECT o FROM InterventionOrder o JOIN o.people p WHERE p.id = :id")
  List<InterventionOrder> findByPeople(@Param("id") Long id);
}