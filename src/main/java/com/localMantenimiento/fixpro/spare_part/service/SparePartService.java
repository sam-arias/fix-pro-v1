package com.localMantenimiento.fixpro.spare_part.service;

import com.localMantenimiento.fixpro.spare_part.model.BrandSparePart;
import com.localMantenimiento.fixpro.spare_part.model.SparePart;
import com.localMantenimiento.fixpro.spare_part.model.TypeSparePart;
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

  public boolean addBrand(BrandSparePart brandSparePart);
  public Optional<BrandSparePart> getBrandByName(String brandName);
  public List<BrandSparePart> getAllBrands();

  public boolean addType(TypeSparePart typeSparePart);
  public Optional<TypeSparePart> getTypeByName(String typeName);
  public List<TypeSparePart> getAllTypes();
  public  boolean deleteUsedSparePart(Long id);

  public List<UsedSparePart> getUsedSparePartsByInterventiondetailsId(Long interventionDetailsId);
}
