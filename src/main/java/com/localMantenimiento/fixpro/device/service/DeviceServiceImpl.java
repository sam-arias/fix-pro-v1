package com.localMantenimiento.fixpro.device.service;

import com.localMantenimiento.fixpro.device.model.Device;

import java.util.List;
import java.util.Optional;

public class DeviceServiceImpl implements DeviceService{

  @Override
  public boolean registerDevice(Device device) {

    return false;
  }

  @Override
  public boolean updateDevice(Long id, Device device) {
    return false;
  }

  @Override
  public boolean deleteDevice(Long id) {
    return false;
  }

  @Override
  public Optional<Device> getDeviceById(Long id) {
    return Optional.empty();
  }

  @Override
  public Optional<Device> getDeviceBySerial(String serial) {
    return Optional.empty();
  }

  @Override
  public List<Device> getAllDevices() {
    return List.of();
  }

  @Override
  public Optional<List<Device>> getAllDevicesByBrand(String brand) {
    return Optional.empty();
  }

  @Override
  public Optional<List<Device>> getAllDevicesByType(String type) {
    return Optional.empty();
  }

  @Override
  public Optional<List<Device>> getAllDevicesByModel(String model) {
    return Optional.empty();
  }
}
