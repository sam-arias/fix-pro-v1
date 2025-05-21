package com.localMantenimiento.fixpro.interventions.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.localMantenimiento.fixpro.device.model.Device;
import com.localMantenimiento.fixpro.person.model.Person;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "intervention_orders")
public class InterventionOrder {

  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "intervention_status", nullable = false, length = 15)
  private String interventionStatus;

  @Column(name = "entry_date", nullable = false, updatable = false)
  private LocalDateTime entryDate;

  @Column(name = "delivery_date", nullable = false)
  private LocalDateTime deliveryDate;

  @PrePersist
  protected void assignEntrydate() {
    this.entryDate = LocalDateTime.now();
  }

  @ToString.Exclude
  @ManyToOne
  @JoinColumn(name = "FK_device_id", nullable = false)
  private Device device;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @ManyToMany
  @JoinTable(name = "intervention_order_person", joinColumns = @JoinColumn(name = "intervention_order_id"),
  inverseJoinColumns = @JoinColumn(name = "person_id"))
  private List<Person> people;

  @JsonProperty("peopleIds")
  public List<Long> getPeopleIds() {
    if (people == null) {
      return Collections.emptyList();
    }
    return people.stream()
        .map(Person::getId)
        .collect(Collectors.toList());
  }

  @OneToOne(mappedBy = "interventionOrder")
  @JsonManagedReference  // Este lado se incluye en el JSON
  private InterventionDetails details;
}
