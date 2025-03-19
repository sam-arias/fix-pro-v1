package com.localMantenimiento.fixpro.Controller;

import com.localMantenimiento.fixpro.Entity.Person;
import com.localMantenimiento.fixpro.Entity.PersonRole;
import com.localMantenimiento.fixpro.Service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/person")
public class PersonController {

  @Autowired
  PersonService personService;

  //Post
  @PostMapping("/register_user")
  public String RegisterUser(@RequestBody Person newPerson) {
    return personService.RegisterPerson(newPerson);
  }

  @PostMapping("/add_role")
  public String AddRole(@RequestBody PersonRole newPersonRole) {
    return personService.CreatePersonRole(newPersonRole);
  }



  //Get
  @GetMapping("/get_personById/{personId}")
  public Optional<Person> GetPersonById(@PathVariable Long personId) {
    return personService.GetPersonById(personId);
  }

  @GetMapping("/get_personByEmail/{email}")
  public Optional<Person> GetPersonByEmail(@PathVariable  String email) {
    return personService.GetPersonByEmail(email);
  }

  @GetMapping("/get_peopleByRole/{personRoleId}")
  public Optional<List<Person>> GetPeopleByRole(@PathVariable  Long personRoleId) {
    return personService.GetPeopleByRole(personRoleId);
  }

  @GetMapping("/get_peopleBySpecialty/{specialtyId}")
  public Optional<List<Person>> GetPeopleBySpecialty(@PathVariable  String specialtyId) {
    return personService.GetPeopleBySpecialty(specialtyId);
  }

  @GetMapping("/get_role/{role}")
  public Optional<PersonRole> GetPersonRoleByRole(@PathVariable String role) {
    return personService.GetPersonRoleByRole(role);
  }

  @GetMapping("/get_allroles")
  public List<PersonRole> GetAllRoles() {
    return personService.GetAllRoles();
  }



  //Update
  @PutMapping("/update_person/{idPerson}")
  public String UpdatePerson(@PathVariable Long idPerson,@RequestBody Person newPerson) {
    return personService.UpdatePerson(idPerson, newPerson);
  }

  @PutMapping("/update_role/{idRole}")
  public String UpdateRole(@PathVariable Long idRole,@RequestBody PersonRole newPersonRole) {
    return personService.UpdatePersonRole(idRole, newPersonRole);
  }


  //Delete
  @DeleteMapping("/delete_person/{idPerson}")
  public String DeletePerson(@PathVariable Long idPerson) {
    return personService.DeletePerson(idPerson);
  }

  @DeleteMapping("/delete_Role/{idRole}")
  public String DeleteRole(@PathVariable Long idRole) {
    return personService.DeletePersonRole(idRole);
  }

}
