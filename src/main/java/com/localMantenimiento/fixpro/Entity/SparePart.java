package com.localMantenimiento.fixpro.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "SpareParts")
public class SparePart {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "Name", nullable = false)
  private String name;

  @Column(name = "Brand", nullable = false)
  private String brand;

  @Column(name = "Price", nullable = false)
  private Double price;

  @Column(name = "Stock", nullable = false)
  private int stock;

  @Column(name = "Status", nullable = false)
  private boolean status;

  public void enableStatus() {
    this.status = true;
  }
  public void disableStatus() {
    this.status = false;
  }
}
