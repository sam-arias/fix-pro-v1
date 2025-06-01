package com.localMantenimiento.fixpro.person.service;

import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Role;
import com.localMantenimiento.fixpro.person.model.Specialty;
import com.localMantenimiento.fixpro.person.repository.PersonRepository;
import com.localMantenimiento.fixpro.person.repository.RoleRepository;
import com.localMantenimiento.fixpro.person.repository.SpecialtyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
  public Optional<Person> registerPerson(Person newPerson) {
    if(newPerson.getRole() != null && ("Cliente".equals(newPerson.getRole().getRoleName()) || !personRepository.existsByEmail(newPerson.getEmail()))) {
      if(newPerson.getPassword() != null) {
        newPerson.encryptPassword(passwordEncoder);
      }
      personRepository.save(newPerson);
      return Optional.of(newPerson);
    }
    return Optional.empty();
  }

  @Override
  public boolean updatePerson(Long id, Person updatedPerson) {
    if(personRepository.existsById(id)) {
      updatedPerson.setId(id);
      if(updatedPerson.getPassword() != null) {
        updatedPerson.encryptPassword(passwordEncoder);
      }else{
        updatedPerson.setPassword(personRepository.findById(id).get().getPassword());
      }
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
  public List<Person> getPeopleByRole(Long roleId) {
    return personRepository.findPersonByRoleId(roleId);
  }

  @Override
  public List<Person> getPeopleByRoleAndSpecialty(Long roleId, Long specialtyId) {
    return personRepository.findByRoleIdAndSpecialtiesId(roleId, specialtyId);
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
  public List<Role> getAllRoles() {
    return roleRepository.findAllRoles();
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
  public List<Specialty> getAllSpecialties() {
    return specialtyRepository.findAll();
  }

  @Override
  public Role login(String email, String password) {
    Optional<Person> person = personRepository.findByEmail(email);
    if (person.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
    }
    if (person.get().getAvailability().equals("Desactivado")) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Usuario Desactivado");
    }
    if (!passwordEncoder.matches(password, person.get().getPassword())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña incorrecta");
    }
    return person.get().getRole();
  }

  @Override
  public Boolean changeAvailability(Long id, String availability) {
    Optional<Person> person = personRepository.findById(id);
    if (person.isEmpty()) {return false;}
    person.get().setId(id);
    person.get().setAvailability(availability);
    personRepository.save(person.get());
    return true;
  }

  @Override
  public Boolean changePassword(Long id, String currentPassword, String newPassword) {
    Optional<Person> person = personRepository.findById(id);
    if (person.isEmpty()) {
      return false;
    }
    if (passwordEncoder.matches(currentPassword, person.get().getPassword()) && !passwordEncoder.matches(newPassword, person.get().getPassword())) {
      person.get().setPassword(passwordEncoder.encode(newPassword));
      personRepository.save(person.get());
      return true;
    }
    return false;
  }

  @Override
  public List<Person> getStaff(Long personId) {
    return personRepository.findStaff(personId);
  }


  @Override
  public Role getRoleByName(String roleName) {
    return roleRepository.findByRoleName(roleName);
  }

  @Override
  public Specialty getSpecialtyByName(String specialtyName) {
    return specialtyRepository.findSpecialtyBySpecialtyName(specialtyName);
  }
}
