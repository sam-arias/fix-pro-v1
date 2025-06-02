package com.localMantenimiento.fixpro.device.repository;

import com.localMantenimiento.fixpro.device.model.BrandDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandDeviceRepository extends JpaRepository<BrandDevice, Long> {
  boolean existsById(Long id);
  boolean existsByBrandName(String name);
  Optional<BrandDevice> findByBrandName(String name);
}
