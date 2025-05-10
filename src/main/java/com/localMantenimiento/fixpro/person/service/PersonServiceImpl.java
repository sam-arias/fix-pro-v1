package com.localMantenimiento.fixpro.person.service;

import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Role;
import com.localMantenimiento.fixpro.person.model.Specialty;
import com.localMantenimiento.fixpro.person.repository.PersonRepository;
import com.localMantenimiento.fixpro.person.repository.RoleRepository;
import com.localMantenimiento.fixpro.person.repository.SpecialtyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonServiceImpl implements PersonService {
  @Autowired
  private PersonRepository personRepository;
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private SpecialtyRepository specialtyRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;


  @Override
  public boolean registerPerson(Person newPerson) {
    if(!personRepository.existsByEmail(newPerson.getEmail())) {
      newPerson.encryptPassword(passwordEncoder);
      personRepository.save(newPerson);
      return true;
    }
    return false;
  }

  @Override
  public boolean updatePerson(Long id, Person updatedPerson) {
    if(personRepository.existsById(id)) {
      updatedPerson.setId(id);
      updatedPerson.encryptPassword(passwordEncoder);
      personRepository.save(updatedPerson);
      return true;
    }
    return false;
  }

  @Override
  public Optional<Person> getPersonById(Long id) {
    return personRepository.findById(id);
  }

  @Override
  public Optional<Person> getPersonByEmail(String email) {
    return personRepository.findByEmail(email);
  }

  @Override
  public Optional<List<Person>> getPeopleByRole(Long roleId) {
    if(roleRepository.existsById(roleId)) {
      return personRepository.findPersonByRoleId(roleId);
    }
    return Optional.empty();
  }

  @Override
  public Optional<List<Person>> getPeopleByRoleAndSpecialty(Long roleId, Long specialtyId) {
    if (roleRepository.existsById(roleId) && specialtyRepository.existsById(specialtyId)) {

      return Optional.of(personRepository.findByRoleIdAndSpecialtiesId(roleId, specialtyId));
    }
    return Optional.empty();
  }

  @Override
  public boolean addRole(Role newRole) {
    if(!roleRepository.existsByRoleName(newRole.getRoleName())) {
      roleRepository.save(newRole);
      return true;
    }
    return false;
  }

  @Override
  public boolean updateRole(Long id, Role updatedRole) {
    if(roleRepository.existsById(id)) {
      updatedRole.setId(id);
      roleRepository.save(updatedRole);
      return true;
    }
    return false;
  }

  @Override
  public Optional<Role> getRoleById(Long id) {
    if(roleRepository.existsById(id)) {
      return roleRepository.findById(id);
    }
    return Optional.empty();
  }

  @Override
  public Optional<List<Role>> getAllRoles() {
    return Optional.of(roleRepository.findAll());
  }

  @Override
  public boolean addSpecialty(Specialty newSpecialty) {
    if (!specialtyRepository.existsBySpecialtyName(newSpecialty.getSpecialtyName())) {
      specialtyRepository.save(newSpecialty);
      return true;
    }
    return false;
  }

  @Override
  public boolean updateSpecialty(Long id, Specialty updatedSpecialty) {
    if(specialtyRepository.existsById(id)) {
      updatedSpecialty.setId(id);
      specialtyRepository.save(updatedSpecialty);
      return true;
    }
    return false;
  }

  @Override
  public Optional<Specialty> getSpecialtyById(Long id) {
    return specialtyRepository.findById(id);
  }

  @Override
  public Optional<List<Specialty>> getAllSpecialties() {
    return Optional.of(specialtyRepository.findAll());
  }

  @Override
  public boolean login(String email, String password) {
    Optional<Person> person = personRepository.findByEmail(email);
    return person.isPresent() && passwordEncoder.matches(password, person.get().getPassword());
  }
}
