package com.localMantenimiento.fixpro.spare_part.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "spare_part")
public class SparePart {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "type", nullable = false, length = 20)
  private String type;

  @Column(name = "model", nullable = false, length = 20)
  private String model;

  @Column(name = "brand", nullable = false, length = 20)
  private String brand;

  @Column(name = "price", nullable = false)
  private Double price;

  @Column(name = "stock", nullable = false)
  private int stock;
}
