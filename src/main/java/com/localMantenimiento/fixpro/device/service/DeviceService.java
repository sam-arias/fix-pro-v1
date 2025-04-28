package com.localMantenimiento.fixpro.device.service;

import com.localMantenimiento.fixpro.device.model.Device;

import java.util.List;
import java.util.Optional;

public interface DeviceService {
  public boolean registerDevice(Device newDevice);
  public boolean updateDevice(Long id, Device updatedDevice);

  public Optional<Device> getDeviceById(Long id);
  public Optional<Device> getDeviceBySerial(String serial);
  public Optional<List<Device>> getAllDevices();
  public Optional<List<Device>> getDevicesByBrand(String brand);
  public Optional<List<Device>> getDevicesByType(String type);
  public Optional<List<Device>> getDevicesByModel(String model);
}
