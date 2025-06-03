package com.localMantenimiento.fixpro.spare_part.controller;

import com.localMantenimiento.fixpro.spare_part.model.BrandSparePart;
import com.localMantenimiento.fixpro.spare_part.model.SparePart;
import com.localMantenimiento.fixpro.spare_part.model.TypeSparePart;
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
  public List<SparePart> getSparePartByModel(@PathVariable String model) {
    return sparePartService.getSparePartByModel(model);
  }

  @GetMapping("/by-brand/{brand}")
  public List<SparePart> getSparePartByBrand(@PathVariable String brand) {
    return sparePartService.getSparePartByBrand(brand);
  }

  @GetMapping("/by-type/{type}")
  public List<SparePart> getSparePartByType(@PathVariable String type) {
    return sparePartService.getSparePartByType(type);
  }

  @GetMapping("by-all-atributes")
  public SparePart getSparePartByBrandTypeAndModel(@RequestParam String brand, @RequestParam String type, @RequestParam String model) {
    return sparePartService.getSparePartByBrandAndTypeAndModel(brand, type, model);
  }

  @GetMapping
  public List<SparePart> getAllSpareParts() {
    return sparePartService.getAllSpareParts();
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

  @PutMapping("/change-availability/{id}")
  public boolean changeAvailabilitySparePart(@PathVariable Long id, @RequestParam String availability) {
    return sparePartService.changeAvailabilitySparePart(id, availability);
  }

  @PostMapping("/brand")
  public boolean addBrand(@RequestBody BrandSparePart brandSparePart) {
    return sparePartService.addBrand(brandSparePart);
  }

  @GetMapping("/brand/{brandName}")
  public Optional<BrandSparePart> getBrandByName(@PathVariable String brandName) {
    return sparePartService.getBrandByName(brandName);
  }

  @GetMapping("brand")
  public List<BrandSparePart> getAllBrands() {
    return sparePartService.getAllBrands();
  }

  @PostMapping("/type")
  public boolean addType(@RequestBody TypeSparePart typeSparePart) {
    return sparePartService.addType(typeSparePart);
  }

  @GetMapping("/type/{typeName}")
  public Optional<TypeSparePart> getTypeByName(@PathVariable String typeName) {
    return sparePartService.getTypeByName(typeName);
  }

  @GetMapping("/type")
  public List<TypeSparePart> getAllTypes() {
    return sparePartService.getAllTypes();
  }

  @DeleteMapping("/used-spare-parts/{id}")
  public boolean deleteUsedSparePart(@PathVariable Long id) {
    return sparePartService.deleteUsedSparePart(id);
  }

  @GetMapping("/used-spare-parts/by-intervention-details-id/{interventionDetailsId}")
  public List<UsedSparePart> getUsedSparePartsByInterventionDetailsId(@PathVariable Long interventionDetailsId) {
    return sparePartService.getUsedSparePartsByInterventiondetailsId(interventionDetailsId);
  }
}
