package com.localMantenimiento.fixpro.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Devices")
public class Device {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "Type", nullable = false)
  private String type;

  @Column(name = "Brand", nullable = false)
  private String brand;

  @Column(name = "Model", nullable = false)
  private String model;

  @Column(name = "SerialNum")
  private String serialNum;

  @Column(name = "DeviceStatus")
  private boolean deviceStatus = true;

  public void disableStatus() {
    this.deviceStatus = false;
  }

}
