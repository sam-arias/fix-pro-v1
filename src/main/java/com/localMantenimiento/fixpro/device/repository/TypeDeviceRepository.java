package com.localMantenimiento.fixpro.device.repository;

import com.localMantenimiento.fixpro.device.model.TypeDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypeDeviceRepository extends JpaRepository<TypeDevice, Long> {
  boolean existsById(Long id);
  Optional<TypeDevice> findByTypeName(String name);
  boolean existsByTypeName(String name);

}
