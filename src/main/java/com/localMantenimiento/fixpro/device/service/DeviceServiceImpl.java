package com.localMantenimiento.fixpro.device.service;

import com.localMantenimiento.fixpro.device.model.Device;
import com.localMantenimiento.fixpro.device.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements DeviceService{

  @Autowired
  private DeviceRepository deviceRepository;

  @Override
  public boolean registerDevice(Device newDevice) {
    deviceRepository.save(newDevice);
    return true;
  }

  @Override
  public boolean updateDevice(Long id, Device updatedDevice) {
    if (deviceRepository.existsById(id)) {
      updatedDevice.setId(id);
      deviceRepository.save(updatedDevice);
      return true;
    }
    return false;
  }

  @Override
  public Optional<Device> getDeviceById(Long id) {
    return deviceRepository.findById(id);
  }

  @Override
  public Optional<Device> getDeviceBySerial(String serial) {
    return deviceRepository.findDeviceBySerial(serial);
  }

  @Override
  public Optional<List<Device>> getAllDevices() {
    return Optional.of(deviceRepository.findAll());
  }

  @Override
  public Optional<List<Device>> getDevicesByBrand(String brand) {
    return deviceRepository.findByBrand(brand);
  }

  @Override
  public Optional<List<Device>> getDevicesByType(String type) {
    return deviceRepository.findByType(type);
  }

  @Override
  public Optional<List<Device>> getDevicesByModel(String model) {
    return deviceRepository.findByModel(model);
  }
}
