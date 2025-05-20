package com.localMantenimiento.fixpro.device.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "devices")
public class Device {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "type", nullable = false, length = 20)
  private String type;

  @Column(name = "brand", nullable = false, length = 20)
  private String brand;

  @Column(name = "model", nullable = false, length = 20)
  private String model;

  @Column(name = "serial", length = 25)
  private String serial;

  @Column(name = "password", length = 20)
  private String password;

}
