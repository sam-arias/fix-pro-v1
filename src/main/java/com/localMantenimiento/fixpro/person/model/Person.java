package com.localMantenimiento.fixpro.person.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "people")
public class Person {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", nullable = false, length = 50)
  private String name;

  @Column(name = "last_name", nullable = false, length = 50)
  private String lastName;

  @Column(name = "email", length = 100)
  private String email;

  @JsonIgnore
  @Column(name = "password", length = 16)
  private String password;

  @Column(name = "phone", nullable = false, length = 10)
  private String phone;

  @Column(name = "address", length = 50)
  private String address;

  @Column(name = "availability")
  private Boolean availability;

  @ManyToOne
  @JoinColumn(name = "FK_role_id", nullable = false)
  private Role role;

  @ManyToMany
  @JoinTable(name = "person_specialty", joinColumns = @JoinColumn(name = "person_id"),
  inverseJoinColumns = @JoinColumn(name = "specialty_id"))
  private List<Specialty> specialties;

  @JsonIgnore
  @ManyToMany(mappedBy = "people")
  private List<InterventionOrder> interventionOrders;
}