package com.localMantenimiento.fixpro.Service;

import com.localMantenimiento.fixpro.Entity.Person;
import com.localMantenimiento.fixpro.Entity.PersonRole;
import com.localMantenimiento.fixpro.Repository.PersonRepository;
import com.localMantenimiento.fixpro.Repository.PersonRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonServiceImpl implements PersonService {
  @Autowired
  PersonRepository personRepository;
  @Autowired
  PersonRoleRepository personRoleRepository;

  @Override
  public String RegisterPerson(Person person) {
    String message;

    if(personRepository.existsByEmail(person.getEmail())) {
      message = "Person Already Exists";
    }else {
      person.enableStatus();
      personRepository.save(person);
      message = "Person Registered Successfully";
    }
    return message;
  }

  @Override
  public Optional<Person> GetPersonById(Long personId) {
    return personRepository.findById(personId);
  }

  @Override
  public Optional<Person> GetPersonByEmail(String email) {
    return personRepository.findByEmail(email);
  }

  @Override
  public Optional<List<Person>> GetPeopleByRole(Long idPersonRole) {
    Optional<PersonRole> personRole = GetPersonRoleById(idPersonRole);
    if(personRole.isPresent()) {
      return personRepository.findByRole(personRole.get());
    }
    return Optional.empty();
  }

  @Override
  public Optional<List<Person>> GetPeopleBySpecialty(String specialty) {
    return personRepository.findBySpecialty(specialty);
  }

  @Override
  public String UpdatePerson(Long personId, Person updatedPerson) {
    String message;
    if(personRepository.existsById(personId)) {
      Person existingPerson = personRepository.findById(personId).get();
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
      if (updatedPerson.getSpecialty() != null) {
        existingPerson.setSpecialty(updatedPerson.getSpecialty());
      }

      if (updatedPerson.getAddress() != null) {
        existingPerson.setAddress(updatedPerson.getAddress());
      }

      if (updatedPerson.getPhone() != null) {
        existingPerson.setPhone(updatedPerson.getPhone());
      }
      personRepository.save(existingPerson);
      message = "Person Updated Successfully";
    }else {
      message = "Person Not Found";
    }
    return message;
  }

  @Override
  public String DeletePerson(Long personId) {
    if(personRepository.existsById(personId)) {
      Person person = personRepository.getReferenceById(personId);
      person.disableStatus();
      return "Person Deleted Successfully";
    }
    return "Person Not Found";
  }

  @Override
  public String CreatePersonRole(PersonRole personRole) {
    String message;
    if(personRoleRepository.existsByRoleIgnoreCase(personRole.getRole())) {
      message = "PersonRole Already Exists";
    }else {
      personRole.enableStatus();
      personRoleRepository.save(personRole);
      message = "PersonRole Registered Successfully";
    }
    return message;
  }

  @Override
  public Optional<PersonRole> GetPersonRoleById(Long personRoleId) {
    return personRoleRepository.findById(personRoleId);
  }

  @Override
  public Optional<PersonRole> GetPersonRoleByRole(String role) {
    return personRoleRepository.findByRole(role);
  }

  @Override
  public List<PersonRole> GetAllRoles() {
    return personRoleRepository.findAll();
  }

  @Override
  public String UpdatePersonRole(Long personRoleId, PersonRole updatePersonRole) {
    String message;
    if(personRoleRepository.existsById(personRoleId)) {
      PersonRole existingPersonRole = personRoleRepository.findById(personRoleId).get();
      if(updatePersonRole.getRole() != null) {
        existingPersonRole.setRole(updatePersonRole.getRole());
      }
      if (updatePersonRole.getStatus() != null) {
        existingPersonRole.setStatus(updatePersonRole.getStatus());
      }
      return "PersonRole Updated Successfully";
    }
    return "PersonRole Not Found";
  }

  @Override
  public String DeletePersonRole(Long personRoleId) {
    if(personRoleRepository.existsById(personRoleId)) {
      PersonRole role = personRoleRepository.getReferenceById(personRoleId);
      role.disableStatus();
      return "PersonRole Deleted Successfully";
    }
    return "Person Not Found";
  }
}
