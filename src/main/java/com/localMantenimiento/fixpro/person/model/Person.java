package com.localMantenimiento.fixpro.person.model;

import com.fasterxml.jackson.annotation.*;
import com.localMantenimiento.fixpro.interventions.model.InterventionOrder;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Column(name = "password")
  private String password;

  @Column(name = "phone", nullable = false, length = 10)
  private String phone;

  @Column(name = "address", length = 50)
  private String address;

  @Column(name = "availability")
  private String availability;

  @ManyToOne
  @JoinColumn(name = "FK_role_id", nullable = false)
  private Role role;

  @ToString.Exclude
  @ManyToMany
  @JoinTable(name = "person_specialty", joinColumns = @JoinColumn(name = "person_id"),
  inverseJoinColumns = @JoinColumn(name = "specialty_id"))
  private List<Specialty> specialties;

  @ToString.Exclude
  @ManyToMany(mappedBy = "people")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private List<InterventionOrder> interventionOrders;

  @JsonProperty("interventionOrderIds")
  public List<Long> getInterventionOrderIds() {
    if (interventionOrders == null) {
      return Collections.emptyList();
    }
    return interventionOrders.stream()
        .map(InterventionOrder::getId)
        .collect(Collectors.toList());
  }

  public void encryptPassword(PasswordEncoder passwordEncoder) {
    this.password = passwordEncoder.encode(this.password);
  }
}