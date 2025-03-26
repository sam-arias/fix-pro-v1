package com.localMantenimiento.fixpro.Service;

import com.localMantenimiento.fixpro.Entity.SparePart;

import java.util.List;
import java.util.Optional;

public interface SparePartService {
  public String RegisterSparePart(SparePart sparePart);

  public Optional<SparePart> GetSparePartById(Long sparePartId);
  public Optional<SparePart> GetSparePartByName(String name);

  public List<SparePart> GetSparePartByBrand(String brand);

  public String UpdateSparePart(Long SparePartId, SparePart updatedSparePart);

  public String DeleteSparePart(Long SparePartId);
}
