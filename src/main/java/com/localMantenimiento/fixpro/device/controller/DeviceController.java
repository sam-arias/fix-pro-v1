package com.localMantenimiento.fixpro.device.controller;

import com.localMantenimiento.fixpro.device.model.Device;
import com.localMantenimiento.fixpro.device.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

  @Autowired
  private DeviceService deviceService;

  // Registrar un nuevo dispositivo
  @PostMapping
  public Device registerDevice(@RequestBody Device newDevice) {
    return deviceService.registerDevice(newDevice);
  }

  // Actualizar un dispositivo existente
  @PutMapping("/{id}")
  public boolean updateDevice(@PathVariable Long id, @RequestBody Device updatedDevice) {
    return deviceService.updateDevice(id, updatedDevice);
  }

  // Obtener dispositivo por ID
  @GetMapping("/{id}")
  public Optional<Device> getDeviceById(@PathVariable Long id) {
    return deviceService.getDeviceById(id);
  }

  // Obtener dispositivo por número de serie
  @GetMapping("/serial/{serial}")
  public Optional<Device> getDeviceBySerial(@PathVariable String serial) {
    return deviceService.getDeviceBySerial(serial);
  }

  // Obtener todos los dispositivos
  @GetMapping
  public Optional<List<Device>> getAllDevices() {
    return deviceService.getAllDevices();
  }

  // Obtener dispositivos por marca
  @GetMapping("/brand/{brand}")
  public Optional<List<Device>> getDevicesByBrand(@PathVariable String brand) {
    return deviceService.getDevicesByBrand(brand);
  }

  // Obtener dispositivos por tipo
  @GetMapping("/type/{type}")
  public Optional<List<Device>> getDevicesByType(@PathVariable String type) {
    return deviceService.getDevicesByType(type);
  }

  // Obtener dispositivos por modelo
  @GetMapping("/model/{model}")
  public Optional<List<Device>> getDevicesByModel(@PathVariable String model) {
    return deviceService.getDevicesByModel(model);
  }
}