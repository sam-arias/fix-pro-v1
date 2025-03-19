package com.localMantenimiento.fixpro.BreakTables;

import com.localMantenimiento.fixpro.Entity.Person;
import com.localMantenimiento.fixpro.Entity.RepairOrder;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "ChainFix")
public class ChainFix {
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "PersonId")
  private Person person;

  @ManyToOne
  @JoinColumn(name = "RepairOrderId")
  private RepairOrder repairOrder;
}
