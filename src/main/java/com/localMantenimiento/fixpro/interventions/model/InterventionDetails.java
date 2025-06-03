package com.localMantenimiento.fixpro.interventions.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
  private Float totalCost= 0.0f;

  @OneToOne
  @JsonBackReference
  @JoinColumn(name = "FK_intervention_order_id")// Este lado se omite al generar JSON
  private InterventionOrder interventionOrder;
}
