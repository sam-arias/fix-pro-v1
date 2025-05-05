package com.localMantenimiento.fixpro.person.controller;
import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Specialty;
import com.localMantenimiento.fixpro.person.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.localMantenimiento.fixpro.person.model.Role;

import java.util.Optional;

@RestController
@RequestMapping("/api/people")
public class PersonController {

  @Autowired
  PersonService personService;

  @PostMapping
  public boolean registerPerson(@RequestBody Person newPerson) {
    return personService.registerPerson(newPerson);
  }

  @PutMapping("/{id}")
  public boolean updatePerson(@PathVariable Long id, @RequestBody Person updatedPerson) {
    return personService.updatePerson(id, updatedPerson);
  }

  @GetMapping("/{id}")
  public Optional<Person> getPersonById(@PathVariable Long id) {
    return personService.getPersonById(id);
  }

  @GetMapping("/by-email/{email}")
  public Optional<Person> getPersonByEmail(@PathVariable String email) {
    return personService.getPersonByEmail(email);
  }

  @GetMapping("/by-role/{roleId}")
  public Optional<List<Person>> getPeopleByRole(@PathVariable Long roleId) {
    return personService.getPeopleByRole(roleId);
  }

  @GetMapping("/by-role-and-specialty")
  public Optional<List<Person>> getPeopleByRoleAndSpecialty(
      @RequestParam Long roleId,
      @RequestParam Long specialtyId) {
    return personService.getPeopleByRoleAndSpecialty(roleId, specialtyId);
  }

  // Role endpoints
  @PostMapping("/roles")
  public boolean addRole(@RequestBody Role newRole) {
    return personService.addRole(newRole);
  }

  @PutMapping("/roles/{id}")
  public boolean updateRole(@PathVariable Long id, @RequestBody Role updatedRole) {
    return personService.updateRole(id, updatedRole);
  }

  @GetMapping("/roles/{id}")
  public Optional<Role> getRoleById(@PathVariable Long id) {
    return personService.getRoleById(id);
  }

  @GetMapping("/roles")
  public Optional<List<Role>> getAllRoles() {
    return personService.getAllRoles();
  }

  // Specialty endpoints
  @PostMapping("/specialties")
  public boolean addSpecialty(@RequestBody Specialty newSpecialty) {
    return personService.addSpecialty(newSpecialty);
  }

  @PutMapping("/specialties/{id}")
  public boolean updateSpecialty(@PathVariable Long id, @RequestBody Specialty updatedSpecialty) {
    return personService.updateSpecialty(id, updatedSpecialty);
  }

  @GetMapping("/specialties/{id}")
  public Optional<Specialty> getSpecialtyById(@PathVariable Long id) {
    return personService.getSpecialtyById(id);
  }

  @GetMapping("/specialties")
  public Optional<List<Specialty>> getAllSpecialties() {
    return personService.getAllSpecialties();
  }
}