package com.localMantenimiento.fixpro.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "RepairOrders")
public class RepairOrder {

  @Id
  @Column(name = "id" , nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "ReapirStatus", nullable = false)
  private String repairStatus;

  @Column(name = "EntryDate", nullable = false, updatable = false)
  private LocalDateTime entryDate;

  @Column(name = "DeliveryDate", nullable = false)
  private LocalDate deliveryDate;

  @PrePersist
  protected void assignEntrydate() {
    this.entryDate = LocalDateTime.now();
  }

  @Column(name = "OrderStatus", nullable = false)
  private boolean orderStatus;

  @ManyToOne
  @JoinColumn(name = "DeviceId", nullable = false)
  private Device device;

  public void disableStatus() {
    this.orderStatus = false;
  }

  public void enableStatus() {
    this.orderStatus = true;
  }
}
