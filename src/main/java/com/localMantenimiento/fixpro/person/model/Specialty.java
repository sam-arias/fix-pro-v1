package com.localMantenimiento.fixpro.person.model;

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
@Table(name = "specialties")
public class Specialty {
  @Id
  @Column(name = "id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "specialty_name", nullable = false, length = 20)
  private String specialtyName;

  @ManyToMany(mappedBy = "specialties")
  private Set<Person> people = new HashSet<>();
}