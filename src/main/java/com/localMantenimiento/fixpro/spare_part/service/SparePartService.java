package com.localMantenimiento.fixpro.spare_part.service;

import com.localMantenimiento.fixpro.spare_part.model.SparePart;
import com.localMantenimiento.fixpro.spare_part.model.UsedSparePart;

import java.util.List;
import java.util.Optional;

public interface SparePartService {
  public boolean registerSparePart(SparePart sparePart);
  public boolean updateSparePart(Long id, SparePart updatedSparePart);

  public Optional<SparePart> GetSparePartById(Long id);
  public Optional<List<SparePart>> getSparePartByModel(String model);
  public Optional<List<SparePart>> getSparePartByBrand(String brand);
  public Optional<List<SparePart>> getSparePartByType(String type);
  public Optional<SparePart> getSparePartByBrandAndTypeAndModel(String brand, String type, String model);

  public boolean useSparePart(UsedSparePart newUsedSparePart);
  public boolean updateUsedSparePart(Long id, UsedSparePart updatedUsedSparePart);

  public Optional<UsedSparePart> getUsedSparePartById(Long id);
}
