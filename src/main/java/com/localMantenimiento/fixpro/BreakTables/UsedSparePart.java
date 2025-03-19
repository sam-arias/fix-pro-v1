package com.localMantenimiento.fixpro.BreakTables;

import com.localMantenimiento.fixpro.Entity.RepairDetail;
import com.localMantenimiento.fixpro.Entity.SparePart;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "UsedSparePartRepository")
public class UsedSparePart {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "Quantity")
  private int quantity;

  @Column(name = "UsedSparePartStatus", nullable = false)
  private boolean usedSparePartStatus = true;

  @ManyToOne
  @JoinColumn(name = "RepairDetailId")
  private RepairDetail repairDetail;

  @ManyToOne
  @JoinColumn(name = "SparePartId")
  private SparePart sparePart;

  public void disableUsedSparePart(){
    this.usedSparePartStatus = false;
  }
}
