package com.localMantenimiento.fixpro.interventions.service;

import com.localMantenimiento.fixpro.interventions.model.InterventionDetails;
import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;
import com.localMantenimiento.fixpro.interventions.repository.InterventionDetailsRepository;
import com.localMantenimiento.fixpro.interventions.repository.InterventionOrderRepository;
import com.localMantenimiento.fixpro.spare_part.repository.UsedSparePartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class InterventionServiceImpl implements InterventionService {

  @Autowired
  InterventionOrderRepository interventionOrderRepository;
  @Autowired
  InterventionDetailsRepository interventionDetailsRepository;
  @Autowired
  UsedSparePartRepository usedSparePartRepository;

  @Override
  public boolean createInterventionOrder(InterventionOrder newInterventionOrder) {
    interventionOrderRepository.save(newInterventionOrder);
    return true;
  }

  @Override
  public boolean updateInterventionOrder(Long id, InterventionOrder updatedInterventionOrder) {
    if (interventionOrderRepository.existsInterventionDetailsById(id)) {
      updatedInterventionOrder.setId(id);
      interventionOrderRepository.save(updatedInterventionOrder);
      return true;
    }
    return false;
  }

  @Override
  public Optional<InterventionOrder> getInterventionOrderById(Long id) {
    return interventionOrderRepository.findById(id);
  }

  @Override
  public Optional<List<InterventionOrder>> getAllInterventionOrders() {
    return Optional.of(interventionOrderRepository.findAll());
  }

  @Override
  public List<InterventionOrder> getInterventionOrdersByStatus(String status) {
    return interventionOrderRepository.findByInterventionStatus(status);
  }

  @Override
  public boolean createInterventionDetails(InterventionDetails newInterventionDetails) {
    interventionDetailsRepository.save(newInterventionDetails);
    return true;
  }

  @Override
  public boolean updateInterventionDetails(Long id, InterventionDetails updatedInterventionDetails) {
    if (interventionDetailsRepository.existsInterventionDetailsById(id)) {
      updatedInterventionDetails.setId(id);
      interventionDetailsRepository.save(updatedInterventionDetails);
      return true;
    }
    return false;
  }

  @Override
  public Optional<InterventionDetails> getInterventionDetailsById(Long id) {
    return interventionDetailsRepository.findById(id);
  }

  @Override
  public ArrayList<Integer> getSalesInformation(Long id) {
    List<InterventionOrder> ordersToday = interventionOrderRepository.findByDay(LocalDate.now());
    List<InterventionOrder> ordersCompleted = interventionOrderRepository.findByInterventionStatus("Completada");
    List<InterventionOrder> pendingOrders = interventionOrderRepository.findByInterventionStatus("Pendiente");
    List<InterventionOrder> ordersInProcess = interventionOrderRepository.findByInterventionStatus("En Proceso");
    List<InterventionOrder> assignedOrders = interventionOrderRepository.findByPeople(id);
    return new ArrayList<>(Arrays.asList(ordersToday.size(), ordersCompleted.size(), pendingOrders.size(), ordersInProcess.size()));
  }

  public List<InterventionOrder> getTop5RecentInterventionOrders() {
    return interventionOrderRepository.findTop5ByOrderByEntryDateDesc();
  }
}
