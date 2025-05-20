package com.localMantenimiento.fixpro.spare_part.service;

import com.localMantenimiento.fixpro.spare_part.model.Brand;
import com.localMantenimiento.fixpro.spare_part.model.SparePart;
import com.localMantenimiento.fixpro.spare_part.model.Type;
import com.localMantenimiento.fixpro.spare_part.model.UsedSparePart;

import java.util.List;
import java.util.Optional;

public interface SparePartService {
  public boolean registerSparePart(SparePart sparePart);
  public boolean updateSparePart(Long id, SparePart updatedSparePart);

  public Optional<SparePart> GetSparePartById(Long id);
  public List<SparePart> getSparePartByModel(String model);
  public List<SparePart> getSparePartByBrand(String brand);
  public List<SparePart> getSparePartByType(String type);
  public SparePart getSparePartByBrandAndTypeAndModel(String brand, String type, String model);
  public List<SparePart> getAllSpareParts();

  public boolean useSparePart(UsedSparePart newUsedSparePart);
  public boolean updateUsedSparePart(Long id, UsedSparePart updatedUsedSparePart);

  public Optional<UsedSparePart> getUsedSparePartById(Long id);

  public boolean changeAvailabilitySparePart(Long id, String availability);

  public boolean addBrand(Brand brand);
  public Optional<Brand> getBrandByName(String brandName);
  public List<Brand> getAllBrands();

  public boolean addType(Type type);
  public Optional<Type> getTypeByName(String typeName);
  public List<Type> getAllTypes();
}
