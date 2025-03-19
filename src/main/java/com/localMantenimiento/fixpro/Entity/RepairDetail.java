package com.localMantenimiento.fixpro.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "RepairDetail")
public class RepairDetail {
  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "ProblemDescription", nullable = false, length = 255)
  private String problemDescription;

  @Column(name = "SolutionDescription", length = 255)
  private String solutionDescription;

  @Column(name = "TotalCost")
  private Double totalCost;

  @Column(name = "RepairDetailStatus")
  private boolean repairDetailStatus = true;

  @ManyToOne
  @JoinColumn(name = "RepairOrderId", nullable = false)
  private RepairOrder repairOrder;

  public void disableStatus() {
    this.repairDetailStatus = false;
  }

}
