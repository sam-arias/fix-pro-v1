package com.localMantenimiento.fixpro.person.model;

import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
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

  @Column(name = "password", length = 16)
  private String password;

  @Column(name = "phone", nullable = false, length = 10)
  private String phone;

  @Column(name = "address", length = 20)
  private String address;

  @Column(name = "availability", nullable = false)
  private boolean availability;

  @ManyToOne
  @JoinColumn(name = "role_id", nullable = false)
  private Role role;

  @ManyToMany
  @JoinTable(
      name = "person_specialty",
      joinColumns = @JoinColumn(name = "FK_person_id"),
      inverseJoinColumns = @JoinColumn(name = "FK_specialty_id")
  )
  private Set<Specialty> specialties = new HashSet<>();

  @ManyToMany(mappedBy = "people")
  private Set<InterventionOrder> interventionOrders = new HashSet<>();
}