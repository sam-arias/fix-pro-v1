package com.localMantenimiento.fixpro.spare_part.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "brand")
public class Brand {
  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "brand_name", nullable = false, length = 20)
  private String brandName;
}
