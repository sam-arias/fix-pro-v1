package com.localMantenimiento.fixpro.device.repository;

import com.localMantenimiento.fixpro.device.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
  boolean existsDeviceById(Long id);

  Optional<Device> findDeviceBySerial(String serial);
  Optional<List<Device>> findByModel(String model);
}
