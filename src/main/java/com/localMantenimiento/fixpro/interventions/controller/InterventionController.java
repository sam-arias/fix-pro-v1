package com.localMantenimiento.fixpro.interventions.controller;

import com.localMantenimiento.fixpro.interventions.model.InterventionDetails;
import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;
import com.localMantenimiento.fixpro.interventions.service.InterventionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
  public Optional<InterventionOrder> createInterventionOrder(@RequestBody InterventionOrder newInterventionOrder) {
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

  @GetMapping("/orders/by-technician-id-and-status")
  public List<InterventionOrder> getInterventionOrdersByTechnicianIdAndStatus(@RequestParam Long technicianId, @RequestParam String status) {
    return interventionService.getInterventionOrdersByTechnicianIdAndStatus(technicianId, status);
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

  @GetMapping("/orders/sales-information/{personId}")
  public List<Integer> getSalesInformation(@PathVariable Long personId) {
    return interventionService.getSalesInformation(personId);
  }

  @GetMapping("/orders/recent-orders")
  public List<InterventionOrder> getTop5RecentInterventionOrders() {
    return interventionService.getTop5RecentInterventionOrders();
  }

  @GetMapping("/orders/by-customer-name")
  public List<InterventionOrder> getOrdersByCustomerName(@RequestParam String customerName, @RequestParam String customerLastName) {
    return interventionService.getOrdersByCustomerName(customerName, customerLastName);
  }

  @GetMapping("/orders/by-day/{date}")
  public List<InterventionOrder> getOrdersByDate(@PathVariable LocalDate date) {
    return interventionService.getOrdersByDate(date);
  }

  @GetMapping("/orders/by-customer-and-day")
  public List<InterventionOrder> getOrdersByCustomerNameAndDate(@RequestParam String customerName, @RequestParam String customerLastName, @RequestParam LocalDate date) {
    return interventionService.getOrdersByCustomerNameAndDate(customerName, customerLastName, date);
  }

  @GetMapping("/details/by-order-id/{orderId}")
  public Optional<InterventionDetails> getInterventionDetilsByOrderId(@PathVariable Long orderId) {
    return interventionService.getInterventionDetilsByOrderId(orderId);
  }

  @GetMapping("/orders/by-technician-id/{technicianId}")
  public List<InterventionOrder> getOrdersByTechnicianId(@PathVariable Long technicianId) {
    return interventionService.getOrdersByTechnicianId(technicianId);
  }

}
