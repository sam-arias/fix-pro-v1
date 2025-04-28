package com.localMantenimiento.fixpro.person.service;

import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Role;
import com.localMantenimiento.fixpro.person.model.Specialty;

import java.util.List;
import java.util.Optional;

public interface PersonService {
  public boolean registerPerson(Person newPerson);
  public boolean updatePerson(Long id,Person updatedPerson);

  public Optional<Person> getPersonById(Long id);
  public Optional<Person> getPersonByEmail(String email);

  public Optional<List<Person>> getPeopleByRole(String roleName);
  public Optional<List<Person>> getPeopleByRoleAndSpecialty(Long roleId, Long specialtyId);

  public boolean addRole(Role newRole);
  public boolean updateRole(Long id, Role updatedRole);

  public Optional<Role> getRoleById(Long id);
  public Optional<List<Role>> getAllRoles();

  public boolean addSpecialty(Specialty newSpecialty);
  public boolean updateSpecialty(Long id, Specialty updatedSpecialty);

  public Optional<Specialty> getSpecialtyById(Long id);
  public Optional<List<Specialty>> getAllSpecialties();
}
