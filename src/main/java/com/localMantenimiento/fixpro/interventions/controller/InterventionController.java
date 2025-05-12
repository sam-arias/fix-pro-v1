package com.localMantenimiento.fixpro.interventions.controller;

import com.localMantenimiento.fixpro.interventions.model.InterventionDetails;
import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;
import com.localMantenimiento.fixpro.interventions.service.InterventionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/interventions")
public class InterventionController {

  @Autowired
  private InterventionService interventionService;

  // Intervention Order endpoints
  @PostMapping("/orders")
  public boolean createInterventionOrder(@RequestBody InterventionOrder newInterventionOrder) {
    return interventionService.createInterventionOrder(newInterventionOrder);
  }

  @PutMapping("/orders/{id}")
  public boolean updateInterventionOrder(
      @PathVariable Long id,
      @RequestBody InterventionOrder updatedInterventionOrder) {
    return interventionService.updateInterventionOrder(id, updatedInterventionOrder);
  }

  @GetMapping("/orders/{id}")
  public Optional<InterventionOrder> getInterventionOrderById(@PathVariable Long id) {
    return interventionService.getInterventionOrderById(id);
  }

  @GetMapping("/orders")
  public Optional<List<InterventionOrder>> getAllInterventionOrders() {
    return interventionService.getAllInterventionOrders();
  }

  @GetMapping("/orders/status/{status}")
  public List<InterventionOrder> getInterventionOrdersByStatus(@PathVariable String status) {
    return interventionService.getInterventionOrdersByStatus(status);
  }

  // Intervention Details endpoints
  @PostMapping("/details")
  public boolean createInterventionDetails(@RequestBody InterventionDetails newInterventionDetails) {
    return interventionService.createInterventionDetails(newInterventionDetails);
  }

  @PutMapping("/details/{id}")
  public boolean updateInterventionDetails(@PathVariable Long id, @RequestBody InterventionDetails updatedInterventionDetails) {
    return interventionService.updateInterventionDetails(id, updatedInterventionDetails);
  }

  @GetMapping("/details/{id}")
  public Optional<InterventionDetails> getInterventionDetailsById(@PathVariable Long id) {
    return interventionService.getInterventionDetailsById(id);
  }

  @GetMapping("/orders/sales-information")
  public ArrayList<Integer> getSalesInformation() {
    return interventionService.getSalesInformation();
  }
}
