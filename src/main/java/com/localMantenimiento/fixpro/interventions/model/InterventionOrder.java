package com.localMantenimiento.fixpro.interventions.model;

import com.localMantenimiento.fixpro.device.model.Device;
import com.localMantenimiento.fixpro.person.model.Person;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "intervention_order")
public class InterventionOrder {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "intervention_status", nullable = false, length = 15)
  private String interventionStatus;

  @Column(name = "entry_date", nullable = false, updatable = false)
  private LocalDateTime entryDate;

  @Column(name = "delivery_date", nullable = false)
  private LocalDate deliveryDate;

  @PrePersist
  protected void assignEntrydate() {
    this.entryDate = LocalDateTime.now();
  }

  @ManyToOne
  @JoinColumn(name = "FK_device_id", nullable = false)
  private Device device;

  @ManyToMany
  @JoinTable(
      name = "intervention_order_person",
      joinColumns = @JoinColumn(name = "FK_intervention_order_id"),
      inverseJoinColumns = @JoinColumn(name = "FK_person_id")
  )
  private Set<Person> people = new HashSet<>();
}
