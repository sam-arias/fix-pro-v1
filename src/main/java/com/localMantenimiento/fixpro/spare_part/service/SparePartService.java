package com.localMantenimiento.fixpro.spare_part.service;

import com.localMantenimiento.fixpro.spare_part.model.SparePart;

import java.util.List;
import java.util.Optional;

public interface SparePartService {
  public boolean registerSparePart(SparePart sparePart);
  public boolean updateSparePart(Long id, SparePart updatedSparePart);

  public SparePart GetSparePartById(Long id);
  public Optional<List<SparePart>> getSparePartByModel(String model);
  public Optional<List<SparePart>> getSparePartByBrand(String brand);
  public Optional<List<SparePart>> getSparePartByType(String type);
  public Optional<SparePart> getSparePartByBrandAndTypeAndModel(String brand, String type, String model);
}
