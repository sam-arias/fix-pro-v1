package com.localMantenimiento.fixpro.interventions.service;

import com.localMantenimiento.fixpro.interventions.model.InterventionDetails;
import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface InterventionService {
  public boolean createInterventionOrder(InterventionOrder newInterventionOrder);
  public boolean updateInterventionOrder(Long id, InterventionOrder updatedInterventionOrder);

  public Optional<InterventionOrder> getInterventionOrderById(Long id);
  public Optional<List<InterventionOrder>> getAllInterventionOrders();
  public List<InterventionOrder> getInterventionOrdersByStatus(String status);

  public boolean createInterventionDetails(InterventionDetails newInterventionDetails);
  public boolean updateInterventionDetails(Long id, InterventionDetails updatedInterventionDetails);

  public Optional<InterventionDetails> getInterventionDetailsById(Long id);

  public ArrayList<Integer> getSalesInformation();

  public List<InterventionOrder> getTop5RecentInterventionOrders();
}
