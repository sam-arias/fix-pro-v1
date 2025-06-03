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

  @Column(name = "model", nullable = false, length = 20)
  private String model;

  @Column(name = "price", nullable = false)
  private Float price= 0.0f;

  @Column(name = "availability", nullable = false)
  private String availability;

  @Column(name = "stock", nullable = false)
  private Integer stock;

  @ManyToOne
  @JoinColumn(name = "brand_id", nullable = false)
  private BrandSparePart brandSparePart;

  @ManyToOne
  @JoinColumn(name = "type_id", nullable = false)
  private TypeSparePart typeSparePart;
}
