package com.localMantenimiento.fixpro.spare_part.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "type")
public class Type {
  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "type_name", nullable = false, length = 20)
  private String typeName;
}
