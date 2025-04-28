package com.localMantenimiento.fixpro.person.model;

import jakarta.persistence.*;
import lombok.Data;

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

  @ManyToMany(mappedBy = "specialties")
  private List<Person> persons;
}