package com.localMantenimiento.fixpro.Service;

import com.localMantenimiento.fixpro.Entity.Device;
import com.localMantenimiento.fixpro.Repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements DeviceService {
  @Autowired
  private DeviceRepository deviceRepository;

  @Override
  public String RegisterDevice(Device device) {
    return "";
  }

  @Override
  public Optional<Device> GetDeviceById(Long devicenId) {
    return Optional.empty();
  }

  @Override
  public List<Device> GetDeviceByBrand(String brand) {
    return List.of();
  }

  @Override
  public String UpdateDevice(Long deviceId, Device updatedDevice) {
    return "";
  }

  @Override
  public String DeleteDevice(Long deviceId) {
    return "";
  }
}
