package com.localMantenimiento.fixpro.person.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "specialties")
public class Specialty {
  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "specialty_name", nullable = false, length = 20)
  private String specialtyName;

  @ToString.Exclude
  @ManyToMany(mappedBy = "specialties")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private List<Person> people;
}