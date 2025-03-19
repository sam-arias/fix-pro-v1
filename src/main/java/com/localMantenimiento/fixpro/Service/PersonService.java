package com.localMantenimiento.fixpro.Service;

import com.localMantenimiento.fixpro.Entity.Person;
import com.localMantenimiento.fixpro.Entity.PersonRole;

import java.util.List;
import java.util.Optional;

public interface PersonService {
  //CRUD Person
  public String RegisterPerson(Person person);

  public Optional<Person> GetPersonById(Long personId);
  public Optional<Person> GetPersonByEmail(String email);

  public Optional<List<Person>> GetPeopleByRole(Long idPersonRole);
  public Optional<List<Person>> GetPeopleBySpecialty(String specialty);

  public String UpdatePerson(Long personId, Person updatedPerson);

  public String DeletePerson(Long personId);

  //CRUD Person Role
  public String CreatePersonRole(PersonRole personRole);

  public Optional<PersonRole> GetPersonRoleById(Long personRoleId);
  public Optional<PersonRole> GetPersonRoleByRole(String role);

  public List<PersonRole> GetAllRoles();

  public String UpdatePersonRole(Long personRoleId, PersonRole updatedPersonRole);

  public String DeletePersonRole(Long personRoleId);

}