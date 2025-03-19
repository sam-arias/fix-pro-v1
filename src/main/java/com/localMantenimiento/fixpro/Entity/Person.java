package com.localMantenimiento.fixpro.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "People")
public class Person {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "Name", nullable = false)
  private String name;

  @Column(name = "LastName", nullable = false)
  private String lastName;

  @Column(name = "Email")
  private String email;

  @Column(name = "Password")
  private String password;

  @Column(name = "Phone")
  private String phone;

  @Column(name = "Address")
  private String address;

  @Column(name = "Status")
  private boolean status;

  @ManyToOne
  @JoinColumn(name = "RoleId", nullable = false)
  private PersonRole role;

  @Column(name = "Specialty")
  private String specialty;

  public void disableStatus() {
    this.status = false;
  }

  public void enableStatus() {
    this.status = true;
  }
}
