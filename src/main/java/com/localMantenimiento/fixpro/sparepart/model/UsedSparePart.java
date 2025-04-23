package com.localMantenimiento.fixpro.sparepart.model;

import com.localMantenimiento.fixpro.repair_order.model.RepairDetail;
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

  @Column(name = "Quantity")
  private int quantity;

  @ManyToOne
  @JoinColumn(name = "RepairDetailId")
  private RepairDetail repairDetail;

  @ManyToOne
  @JoinColumn(name = "SparePartId")
  private SparePart sparePart;
}
