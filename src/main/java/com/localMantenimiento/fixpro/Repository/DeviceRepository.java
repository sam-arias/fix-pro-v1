package com.localMantenimiento.fixpro.Repository;

import com.localMantenimiento.fixpro.Entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
}
