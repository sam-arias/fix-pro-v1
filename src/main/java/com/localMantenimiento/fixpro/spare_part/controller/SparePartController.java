package com.localMantenimiento.fixpro.spare_part.controller;

import com.localMantenimiento.fixpro.spare_part.model.SparePart;
import com.localMantenimiento.fixpro.spare_part.model.UsedSparePart;
import com.localMantenimiento.fixpro.spare_part.service.SparePartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/spare-parts")
public class SparePartController {

  @Autowired
  private SparePartService sparePartService;

  @PostMapping
  public boolean registerSparePart(@RequestBody SparePart sparePart) {
    return sparePartService.registerSparePart(sparePart);
  }

  @PutMapping("/{sparePartId}")
  public boolean updateSparePart(@PathVariable Long sparePartId, @RequestBody SparePart updatedSparePart) {
    return sparePartService.updateSparePart(sparePartId, updatedSparePart);
  }

  @GetMapping("/{sparePartId}")
  public Optional<SparePart> GetSparePart(@PathVariable Long sparePartId) {
    return sparePartService.GetSparePartById(sparePartId);
  }

  @GetMapping("/by-model/{model}")
  public Optional<List<SparePart>> getSparePartByModel(@PathVariable String model) {
    return sparePartService.getSparePartByModel(model);
  }

  @GetMapping("/by-brand/{brand}")
  public Optional<List<SparePart>> getSparePartByBrand(@PathVariable String brand) {
    return sparePartService.getSparePartByBrand(brand);
  }

  @GetMapping("/by-type/{type}")
  public Optional<List<SparePart>> getSparePartByType(@PathVariable String type) {
    return sparePartService.getSparePartByType(type);
  }

  @GetMapping
  public Optional<SparePart> getSparePartByBrandTypeAndModel(@RequestParam String brand, @RequestParam String type, @RequestParam String model) {
    return sparePartService.getSparePartByBrandAndTypeAndModel(brand, type, model);
  }

  @PostMapping("/used-spare-parts")
  public boolean useSparePart(@RequestBody UsedSparePart newUsedSparePart) {
    return sparePartService.useSparePart(newUsedSparePart);
  }

  // Actualizar un repuesto usado
  @PutMapping("/used-spare-parts/{id}")
  public boolean updateUsedSparePart(@PathVariable Long id, @RequestBody UsedSparePart updatedUsedSparePart) {
    return sparePartService.updateUsedSparePart(id, updatedUsedSparePart);
  }

  // Obtener un repuesto usado por ID
  @GetMapping("/used-spare-parts/{id}")
  public Optional<UsedSparePart> getUsedSparePartById(@PathVariable Long id) {
    return sparePartService.getUsedSparePartById(id);
  }
}
