package com.localMantenimiento.fixpro.person.service;

import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Role;
import com.localMantenimiento.fixpro.person.model.Specialty;

import java.util.List;
import java.util.Optional;

public interface PersonService {
  public Optional<Person> registerPerson(Person newPerson);
  public boolean updatePerson(Long id,Person updatedPerson);

  public Optional<Person> getPersonById(Long id);
  public Optional<Person> getPersonByEmail(String email);

  public List<Person> getPeopleByRole(Long roleId);
  public List<Person> getPeopleByRoleAndSpecialty(Long roleId, Long specialtyId);

  public boolean addRole(Role newRole);
  public boolean updateRole(Long id, Role updatedRole);

  public Optional<Role> getRoleById(Long id);
  public List<Role> getAllRoles();

  public boolean addSpecialty(Specialty newSpecialty);
  public boolean updateSpecialty(Long id, Specialty updatedSpecialty);

  public Optional<Specialty> getSpecialtyById(Long id);
  public List<Specialty> getAllSpecialties();


  public Role login(String email, String password);
  public Boolean changeAvailability(Long id, String availability);
  public Boolean changePassword(Long id, String currentPassword, String newPassword);
  public List<Person> getStaff(Long personId);

  public Role getRoleByName(String roleName);
  public Specialty getSpecialtyByName(String specialtyName);
}
