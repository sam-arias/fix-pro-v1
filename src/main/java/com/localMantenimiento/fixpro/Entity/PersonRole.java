package com.localMantenimiento.fixpro.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "PersonRole")
public class PersonRole {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "Role", nullable = false)
  private String role;

  @Column(name = "Status", nullable = false)
  private Boolean status;

  public void disableStatus() {
    this.status = false;
  }

  public void enableStatus() {
    this.status = true;
  }
}
