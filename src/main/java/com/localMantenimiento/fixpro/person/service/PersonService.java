package com.localMantenimiento.fixpro.person.service;

import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Role;
import com.localMantenimiento.fixpro.person.model.Specialty;

import java.util.List;
import java.util.Optional;

public interface PersonService {
  //Person methods
  public boolean registerPerson(Person person);
  public boolean updatePerson(Long id, Person updatedPerson);
  public boolean deletePerson(Long id);

  public Optional<Person> GetPersonById(Long id);
  public Optional<Person> GetPersonByEmail(String email);
  public Optional<List<Person>> GetPeopleByRole(String roleName);
  public Optional<List<Person>> GetPeopleBySpecialty(String specialtyName);

  public boolean login(String email, String password);

  //Role methods
  public boolean createRole(Role role);
  public boolean updateRole(Long id, String newRoleName);
  public boolean deleteRole(Long id);

  public Optional<Role> GetRoleById(Long id);
  public List<Role> GetRoles();

  //Specialty methods
  public boolean createSpecialty(Specialty specialty);
  public boolean updateSpecialty(Long id, String newSpecialtyName);
  public boolean deleteSpecialty(Long id);

  public Optional<Specialty> GetSpecialtyById(Long id);
  public List<Specialty> GetSpecialties();
}
