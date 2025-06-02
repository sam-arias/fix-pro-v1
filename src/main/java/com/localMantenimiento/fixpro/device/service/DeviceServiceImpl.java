package com.localMantenimiento.fixpro.device.service;

import com.localMantenimiento.fixpro.device.model.BrandDevice;
import com.localMantenimiento.fixpro.device.model.Device;
import com.localMantenimiento.fixpro.device.model.TypeDevice;
import com.localMantenimiento.fixpro.device.repository.DeviceRepository;
import com.localMantenimiento.fixpro.device.repository.TypeRepository;
import com.localMantenimiento.fixpro.device.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements DeviceService{

  @Autowired
  private DeviceRepository deviceRepository;
  @Autowired
  private BrandRepository brandRepository;
  @Autowired
  private TypeRepository typeRepository;

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

  @Override
  public boolean addBrand(BrandDevice brandDevice) {
    if (!brandRepository.existsByBrandName(brandDevice.getBrandName())) {
      brandRepository.save(brandDevice);
      return true;
    }
    return false;
  }

  @Override
  public Optional<BrandDevice> getBrandByName(String brandName) {
    return brandRepository.findByBrandName(brandName);
  }

  @Override
  public List<BrandDevice> getAllBrands() {
    return brandRepository.findAll();
  }

  @Override
  public boolean addType(TypeDevice typeDevice) {
    if (!typeRepository.existsByTypeName(typeDevice.getTypeName())) {
      typeRepository.save(typeDevice);
      return true;
    }
    return false;
  }

  @Override
  public Optional<TypeDevice> getTypeByName(String typeName) {
    return typeRepository.findByTypeName(typeName);
  }

  @Override
  public List<TypeDevice> getAllTypes() {
    return typeRepository.findAll();
  }
}
