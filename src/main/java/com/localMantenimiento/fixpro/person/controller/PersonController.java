package com.localMantenimiento.fixpro.person.controller;
import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Specialty;
import com.localMantenimiento.fixpro.person.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import com.localMantenimiento.fixpro.person.model.Role;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/people")
public class PersonController {

  @Autowired
  PersonService personService;

  @PostMapping
  public Optional<Person> registerPerson(@RequestBody Person newPerson) {
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
  public List<Person> getPeopleByRole(@PathVariable Long roleId) {
    return personService.getPeopleByRole(roleId);
  }

  @GetMapping("/by-role-and-specialty")
  public List<Person> getPeopleByRoleAndSpecialty(
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

  @GetMapping("/roles/id/{id}")
  public Optional<Role> getRoleById(@PathVariable Long id) {
    return personService.getRoleById(id);
  }


  @GetMapping("/roles")
  public List<Role> getAllRoles() {
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

  @GetMapping("/specialties/id/{id}")
  public Optional<Specialty> getSpecialtyById(@PathVariable Long id) {
    return personService.getSpecialtyById(id);
  }

  @GetMapping("/specialties")
  public List<Specialty> getAllSpecialties() {
    return personService.getAllSpecialties();
  }

  @PostMapping("/login")
  public ResponseEntity<Map<String, Object>> login(
      @RequestBody Map<String, String> credentials) {
    String email = credentials.get("email");
    String password = credentials.get("password");

    Role userRole = personService.login(email, password);

    if (userRole == null) {
      Map<String, Object> errorResponse = new HashMap<>();
      errorResponse.put("success", false);
      errorResponse.put("message", "Usuario o contraseña incorrectos");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    Map<String, Object> response = new HashMap<>();
    response.put("success", true);
    response.put("role", userRole.getRoleName());

    return ResponseEntity.ok(response);
  }

  @PutMapping("/change-availability/{id}")
  public Boolean changeAvailability(@PathVariable Long id, @RequestParam String availability) {
    return personService.changeAvailability(id, availability);
  }

  @PutMapping("/change-password/{id}")
  public Boolean changePassword(@PathVariable Long id, @RequestBody Map<String, String> passwords){
    return personService.changePassword(id, passwords.get("currentPassword"), passwords.get("newPassword"));
  }


  @GetMapping("/staff/{personId}")
  public List<Person> getPeopleByStaff(@PathVariable Long personId) {
    return personService.getStaff(personId);
  }

  @GetMapping("/roles/name/{name}")
  public Role getRolesByName(@PathVariable String name) {
    return personService.getRoleByName(name);
  }

  @GetMapping("/specialties/name/{name}")
  public Specialty getSpecialtiesByName(@PathVariable String name) {
    return personService.getSpecialtyByName(name);
  }
}