package com.localMantenimiento.fixpro.device.service;

import com.localMantenimiento.fixpro.device.model.BrandDevice;
import com.localMantenimiento.fixpro.device.model.Device;
import com.localMantenimiento.fixpro.device.model.TypeDevice;
import com.localMantenimiento.fixpro.device.repository.DeviceRepository;
import com.localMantenimiento.fixpro.device.repository.TypeDeviceRepository;
import com.localMantenimiento.fixpro.device.repository.BrandDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements DeviceService{

  @Autowired
  private DeviceRepository deviceRepository;
  @Autowired
  private BrandDeviceRepository brandDeviceRepository;
  @Autowired
  private TypeDeviceRepository typeDeviceRepository;

  @Override
  public Device registerDevice(Device newDevice) {
    deviceRepository.save(newDevice);
    System.out.println(newDevice);
    return newDevice;
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
  public Optional<List<Device>> getDevicesByModel(String model) {
    return deviceRepository.findByModel(model);
  }

  @Override
  public boolean addBrand(BrandDevice brandDevice) {
    if (!brandDeviceRepository.existsByBrandName(brandDevice.getBrandName())) {
      brandDeviceRepository.save(brandDevice);
      return true;
    }
    return false;
  }

  @Override
  public Optional<BrandDevice> getBrandByName(String brandName) {
    return brandDeviceRepository.findByBrandName(brandName);
  }

  @Override
  public List<BrandDevice> getAllBrands() {
    return brandDeviceRepository.findAll();
  }

  @Override
  public boolean addType(TypeDevice typeDevice) {
    if (!typeDeviceRepository.existsByTypeName(typeDevice.getTypeName())) {
      typeDeviceRepository.save(typeDevice);
      return true;
    }
    return false;
  }

  @Override
  public Optional<TypeDevice> getTypeByName(String typeName) {
    return typeDeviceRepository.findByTypeName(typeName);
  }

  @Override
  public List<TypeDevice> getAllTypes() {
    return typeDeviceRepository.findAll();
  }
}
