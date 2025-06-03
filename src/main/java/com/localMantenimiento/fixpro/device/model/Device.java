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

  @Column(name = "model", nullable = false, length = 20)
  private String model;

  @Column(name = "serial", length = 25)
  private String serial;

  @Column(name = "password", length = 20)
  private String password;

  @ManyToOne
  @JoinColumn(name = "brand_id", nullable = false)
  private BrandDevice brandDevice;

  @ManyToOne
  @JoinColumn(name = "type_id", nullable = false)
  private TypeDevice typeDevice;

}
