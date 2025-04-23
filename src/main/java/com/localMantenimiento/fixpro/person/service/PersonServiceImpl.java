package com.localMantenimiento.fixpro.person.service;

import com.localMantenimiento.fixpro.person.model.Person;
import com.localMantenimiento.fixpro.person.model.Role;
import com.localMantenimiento.fixpro.person.model.Specialty;
import com.localMantenimiento.fixpro.person.repository.PersonRepository;
import com.localMantenimiento.fixpro.person.repository.RoleRepository;
import com.localMantenimiento.fixpro.person.repository.SpecialtyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonServiceImpl implements PersonService {
  @Autowired
  PersonRepository personRepository;
  @Autowired
  SpecialtyRepository specialtyRepository;
  @Autowired
  RoleRepository roleRepository;


  @Override
  public boolean registerPerson(Person person) {
    if(!personRepository.existsByEmail(person.getEmail())) {
      personRepository.save(person);
      return true;
    }
    return false;
  }

  @Override
  public boolean updatePerson(Long id, Person updatedPerson) {
    if(personRepository.existsById(id)) {
      Person existingPerson = personRepository.findById(id).get();
      if (updatedPerson.getName() != null) {
        existingPerson.setName(updatedPerson.getName());
      }

      if (updatedPerson.getLastName() != null) {
        existingPerson.setLastName(updatedPerson.getLastName());
      }

      if (updatedPerson.getEmail() != null) {
        existingPerson.setEmail(updatedPerson.getEmail());
      }

      if (updatedPerson.getPassword() != null) {
        existingPerson.setPassword(updatedPerson.getPassword());
      }

      if (updatedPerson.getRole() != null) {
        existingPerson.setRole(updatedPerson.getRole());
      }

      if (updatedPerson.getSpecialties() != null) {
        existingPerson.setSpecialties(updatedPerson.getSpecialties());
      }

      if (updatedPerson.getAddress() != null) {
        existingPerson.setAddress(updatedPerson.getAddress());
      }

      if (updatedPerson.getPhone() != null) {
        existingPerson.setPhone(updatedPerson.getPhone());
      }
      personRepository.save(updatedPerson);
      return true;
    }
    return false;
  }

  @Override
  public boolean deletePerson(Long id) {
    if(personRepository.existsById(id)) {
      personRepository.deleteById(id);
      return true;
    }
    return false;
  }

  @Override
  public Optional<Person> GetPersonById(Long id) {
    return personRepository.findById(id);
  }

  @Override
  public Optional<Person> GetPersonByEmail(String email) {
    return personRepository.findByEmail(email);
  }

  @Override
  public Optional<List<Person>> GetPeopleByRole(String roleName) {
    return personRepository.findByRole(roleName);
  }

  @Override
  public Optional<List<Person>> GetPeopleBySpecialty(String specialtyName) {
    return personRepository.findBySpecialty(specialtyName);
  }


  @Override
  public boolean login(String email, String password) {
    return false;
  }

  @Override
  public boolean createRole(Role role) {
    if(!roleRepository.existsByRoleName(role.getRoleName())) {
      roleRepository.save(role);
      return true;
    }
    return false;
  }

  @Override
  public boolean updateRole(Long id, String newRoleName) {
    if (roleRepository.existsById(id)) {
      Role role = roleRepository.findById(id).get();
      role.setRoleName(newRoleName);
      roleRepository.save(role);
      return true;
    }
    return false;
  }

  @Override
  public boolean deleteRole(Long id) {
    return false;
  }

  @Override
  public Optional<Role> GetRoleById(Long id) {
    return roleRepository.findById(id);
  }

  @Override
  public List<Role> GetRoles() {
    return roleRepository.findAll();
  }

  @Override
  public boolean createSpecialty(Specialty specialty) {
    if(!specialtyRepository.existsBySpecialtyName(specialty.getSpecialtyName())) {
      specialtyRepository.save(specialty);
      return true;
    }
    return false;
  }

  @Override
  public boolean updateSpecialty(Long id, String newSpecialtyName) {
    if (specialtyRepository.existsById(id)) {
      Specialty specialty = specialtyRepository.findById(id).get();
      specialty.setSpecialtyName(newSpecialtyName);
      specialtyRepository.save(specialty);
      return true;
    }
    return false;
  }

  @Override
  public boolean deleteSpecialty(Long id) {
    if(specialtyRepository.existsById(id)) {
      specialtyRepository.deleteById(id);
      return true;
    }
    return false;
  }

  @Override
  public Optional<Specialty> GetSpecialtyById(Long id) {
    return specialtyRepository.findById(id);
  }

  @Override
  public List<Specialty> GetSpecialties() {
    return specialtyRepository.findAll();
  }
}
