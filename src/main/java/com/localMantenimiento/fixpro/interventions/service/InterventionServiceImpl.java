package com.localMantenimiento.fixpro.interventions.service;

import com.localMantenimiento.fixpro.interventions.model.InterventionDetails;
import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;
import com.localMantenimiento.fixpro.interventions.repository.InterventionDetailsRepository;
import com.localMantenimiento.fixpro.interventions.repository.InterventionOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterventionServiceImpl implements InterventionService {

  @Autowired
  InterventionOrderRepository interventionOrderRepository;
  @Autowired
  InterventionDetailsRepository interventionDetailsRepository;

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
  public Optional<List<InterventionOrder>> getInterventionOrdersByStatus(String status) {
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
}
