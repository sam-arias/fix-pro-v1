package com.localMantenimiento.fixpro.device.service;

import com.localMantenimiento.fixpro.device.model.BrandDevice;
import com.localMantenimiento.fixpro.device.model.Device;
import com.localMantenimiento.fixpro.device.model.TypeDevice;

import java.util.List;
import java.util.Optional;

public interface DeviceService {
  public Device registerDevice(Device newDevice);
  public boolean updateDevice(Long id, Device updatedDevice);

  public Optional<Device> getDeviceById(Long id);
  public Optional<Device> getDeviceBySerial(String serial);
  public Optional<List<Device>> getAllDevices();
  public Optional<List<Device>> getDevicesByModel(String model);

  public boolean addBrand(BrandDevice brandDevice);
  public Optional<BrandDevice>getBrandByName(String brandName);
  public List<BrandDevice> getAllBrands();

  public boolean addType(TypeDevice typeDevice);
  public Optional<TypeDevice> getTypeByName(String typeName);
  public List<TypeDevice> getAllTypes();
}
