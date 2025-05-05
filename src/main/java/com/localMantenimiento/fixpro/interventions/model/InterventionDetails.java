package com.localMantenimiento.fixpro.interventions.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "intervention_details")
public class InterventionDetails {
  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "problem_description", nullable = false)
  private String problemDescription;

  @Column(name = "solution_description")
  private String solutionDescription;

  @Column(name = "total_cost")
  private Double totalCost;

  @ManyToOne
  @JoinColumn(name = "FK_intervention_order_id")
  private InterventionOrder interventionOrderOrder;
}
