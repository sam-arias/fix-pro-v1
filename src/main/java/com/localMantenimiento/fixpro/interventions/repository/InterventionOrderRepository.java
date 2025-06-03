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
  List<InterventionOrder> findByPeopleIdAndInterventionStatus(Long peopleId,String interventionStatus);
  List<InterventionOrder> findTop5ByOrderByEntryDateDesc();
  @Query("SELECT o FROM InterventionOrder o WHERE DATE(o.entryDate) = :date")
  List<InterventionOrder> findByDay(@Param("date") LocalDate date);

  @Query("SELECT DISTINCT o FROM InterventionOrder o JOIN o.people p WHERE p.id = :id  AND (o.interventionStatus != 'Completada' AND o.interventionStatus != 'Entregada')")
  List<InterventionOrder> findByPeopleId(@Param("id") Long id);

  @Query("SELECT o FROM InterventionOrder o JOIN o.people p WHERE p.id = :id AND DATE(o.entryDate) = :date")
  List<InterventionOrder> findByPeopleIdAndDate(@Param("id") Long id, @Param("date") LocalDate date);

  @Query("SELECT  o FROM InterventionOrder o JOIN o.people p WHERE p.name = :name AND p.lastName = :lastName  AND  p.role.roleName = 'Cliente'")
  List<InterventionOrder> findByCustomerName(@Param("name") String name, @Param("lastName") String customerLastName);

  @Query("SELECT o FROM InterventionOrder o JOIN o.people p WHERE p.name = :name AND p.lastName = :lastName AND DATE(o.entryDate) = :date")
  List<InterventionOrder> findByCustomerNameAndDate(@Param("name") String name, @Param("lastName") String  lastName,@Param("date") LocalDate date);

}