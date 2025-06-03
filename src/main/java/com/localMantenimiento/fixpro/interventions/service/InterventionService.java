package com.localMantenimiento.fixpro.interventions.service;

import com.localMantenimiento.fixpro.interventions.model.InterventionDetails;
import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface InterventionService {
  public Optional<InterventionOrder> createInterventionOrder(InterventionOrder newInterventionOrder);
  public boolean updateInterventionOrder(Long id, InterventionOrder updatedInterventionOrder);

  public Optional<InterventionOrder> getInterventionOrderById(Long id);
  public Optional<List<InterventionOrder>> getAllInterventionOrders();
  public List<InterventionOrder> getInterventionOrdersByTechnicianIdAndStatus(Long technicianId, String status);

  public boolean createInterventionDetails(InterventionDetails newInterventionDetails);
  public boolean updateInterventionDetails(Long id, InterventionDetails updatedInterventionDetails);

  public Optional<InterventionDetails> getInterventionDetailsById(Long id);

  public List<Integer> getSalesInformation(Long personId);

  public List<InterventionOrder> getTop5RecentInterventionOrders();

  public List<InterventionOrder> getOrdersByCustomerName(String customerName, String customerLastName);

  public List<InterventionOrder> getOrdersByTechnicianId(Long technicianId);

  public List<InterventionOrder> getOrdersByDate(LocalDate date);

  public List<InterventionOrder> getOrdersByCustomerNameAndDate(String customerName, String customerLastName, LocalDate date);

  public Optional<InterventionDetails> getInterventionDetilsByOrderId(Long orderId);

}
