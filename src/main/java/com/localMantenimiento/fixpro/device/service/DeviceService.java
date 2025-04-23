package com.localMantenimiento.fixpro.device.service;

import com.localMantenimiento.fixpro.device.model.Device;

import java.util.List;
import java.util.Optional;

public interface DeviceService {
  public boolean registerDevice(Device device);
  public boolean updateDevice(Long id, Device device);
  public boolean deleteDevice(Long id);

  public Optional<Device> getDeviceById(Long id);
  public Optional<Device> getDeviceBySerial(String serial);
  public List<Device> getAllDevices();
  public Optional<List<Device>> getAllDevicesByBrand(String brand);
  public Optional<List<Device>> getAllDevicesByType(String type);
  public Optional<List<Device>> getAllDevicesByModel(String model);
}
