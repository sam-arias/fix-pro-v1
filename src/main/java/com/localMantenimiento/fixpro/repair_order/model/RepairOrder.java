package com.localMantenimiento.fixpro.repair_order.model;

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
@Table(name = "repair_order")
public class RepairOrder {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "reapir_status", nullable = false)
  private boolean repairStatus;

  @Column(name = "entry_date", nullable = false, updatable = false)
  private LocalDateTime entryDate;

  @Column(name = "delivery_date", nullable = false)
  private LocalDate deliveryDate;

  @PrePersist
  protected void assignEntrydate() {
    this.entryDate = LocalDateTime.now();
  }

  @ManyToOne
  @JoinColumn(name = "DeviceId", nullable = false)
  private Device device;

  @ManyToMany
  @JoinTable(
      name = "repair_order_person",
      joinColumns = @JoinColumn(name = "FK_repair_order_id"),
      inverseJoinColumns = @JoinColumn(name = "FK_person_id")
  )
  private Set<Person> people = new HashSet<>();
}
