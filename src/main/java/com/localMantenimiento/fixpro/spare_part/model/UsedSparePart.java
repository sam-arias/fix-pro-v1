package com.localMantenimiento.fixpro.spare_part.model;

import com.localMantenimiento.fixpro.interventions.model.InterventionDetails;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "used_spare_part")
public class UsedSparePart {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "quantity")
  private Integer quantity;

  @Column(name = "cost_spare_parts")
  private Float costSpareParts;

  @ManyToOne
  @JoinColumn(name = "FK_intervention_detail_id")
  private InterventionDetails interventionDetails;

  @ManyToOne
  @JoinColumn(name = "FK_spare_part_id")
  private SparePart sparePart;
}
