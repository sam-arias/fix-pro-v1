package com.localMantenimiento.fixpro.person.controller;

import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Role;
import com.localMantenimiento.fixpro.person.model.Specialty;
import com.localMantenimiento.fixpro.person.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController("/api/people")
public class PersonController {
  @Autowired
  PersonService personService;

  //Person
  @PostMapping("/cr")
  public boolean registerPerson(@RequestBody Person person) {
    return personService.registerPerson(person);
  }

  @PutMapping("{personId}")
  public boolean updatePerson(@PathVariable Long personId, @RequestBody Person updatedPerson) {
    return personService.updatePerson(personId, updatedPerson);
  }

  @DeleteMapping("/dl/{id}")
  public boolean deletePerson(@PathVariable Long id) {
    return personService.deletePerson(id);
  }

  @GetMapping("/{personId}")
  public Optional<Person> GetPersonById(@PathVariable Long personId) {
    return personService.GetPersonById(personId);
  }

  @GetMapping("/{email}")
  public Optional<Person> GetPersonByEmail(@PathVariable String email) {
    return personService.GetPersonByEmail(email);
  }

  @GetMapping("/{roleName}")
  public Optional<List<Person>> GetPeopleByRole(@PathVariable String roleName) {
    return personService.GetPeopleByRole(roleName);
  }

  @GetMapping("/{specialtyName}")
  public Optional<List<Person>> GetPeopleBySpecialty(@PathVariable String specialtyName) {
    return personService.GetPeopleBySpecialty(specialtyName);
  }

  /*
  /public boolean login(String email, String password) {
    return personService.login(email, password);
  }*/

  //Role
  @PostMapping("/role/cr")
  public boolean createRole(Role role) {
    return personService.createRole(role);
  }

  @PutMapping("/role/up/{id}/{newRoleName}")
  public boolean updateRole(@PathVariable Long id, @PathVariable String newRoleName) {
    return personService.updateRole(id, newRoleName);
  }

  @DeleteMapping("/role/dl/{id}")
  public boolean deleteRole(@PathVariable Long id) {
    return personService.deleteRole(id);
  }

  @GetMapping("/role/{id}")
  public Optional<Role> GetRoleById(Long id) {
    return personService.GetRoleById(id);
  }

  @GetMapping("/role")
  public List<Role> GetRoles() {
    return personService.GetRoles();
  }

  //Specialty
  @PostMapping("/specialty/cr")
  public boolean createSpecialty(Specialty specialty){
    return personService.createSpecialty(specialty);
  }

  @PutMapping("/specialty/up/{id}")
  public boolean updateSpecialty(@PathVariable Long id, @RequestBody String newSpecialtyName) {
    return personService.updateSpecialty(id, newSpecialtyName);
  }

  @DeleteMapping("/specialty/dl/{id}")
  public boolean deleteSpecialty(@PathVariable Long id) {
    return personService.deleteSpecialty(id);
  }

  @GetMapping("/specialty/{id}")
  public Optional<Specialty> GetSpecialtyById(@PathVariable Long id) {
    return personService.GetSpecialtyById(id);
  }

  @GetMapping("/specialty")
  public List<Specialty> GetSpecialties() {
    return personService.GetSpecialties();
  }
}
