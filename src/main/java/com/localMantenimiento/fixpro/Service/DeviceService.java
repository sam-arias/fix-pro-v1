package com.localMantenimiento.fixpro.Service;

import com.localMantenimiento.fixpro.Entity.Device;

import java.util.List;
import java.util.Optional;

public interface DeviceService {
  public String RegisterDevice(Device device);

  public Optional<Device> GetDeviceById(Long devicenId);

  public List<Device> GetDeviceByBrand(String brand);

  public String UpdateDevice(Long deviceId, Device updatedDevice);

  public String DeleteDevice(Long deviceId);
}
