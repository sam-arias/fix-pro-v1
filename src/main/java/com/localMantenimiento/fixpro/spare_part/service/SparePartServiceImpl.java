package com.localMantenimiento.fixpro.spare_part.service;

import com.localMantenimiento.fixpro.spare_part.model.Brand;
import com.localMantenimiento.fixpro.spare_part.model.SparePart;
import com.localMantenimiento.fixpro.spare_part.model.Type;
import com.localMantenimiento.fixpro.spare_part.model.UsedSparePart;
import com.localMantenimiento.fixpro.spare_part.repository.BrandRepository;
import com.localMantenimiento.fixpro.spare_part.repository.SparePartRepository;
import com.localMantenimiento.fixpro.spare_part.repository.TypeRepository;
import com.localMantenimiento.fixpro.spare_part.repository.UsedSparePartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SparePartServiceImpl implements SparePartService {

  @Autowired
  private SparePartRepository sparePartRepository;
  @Autowired
  private UsedSparePartRepository usedSparePartRepository;
  @Autowired
  private BrandRepository brandRepository;
  @Autowired
  private TypeRepository typeRepository;

  @Override
  public boolean registerSparePart(SparePart sparePart) {
    if (!sparePartRepository.existsByBrandBrandNameAndTypeTypeNameAndModel(sparePart.getBrand().getBrandName(), sparePart.getType().getTypeName(), sparePart.getModel())) {
      sparePartRepository.save(sparePart);
      return true;
    }
    return false;
  }

  @Override
  public boolean updateSparePart(Long id, SparePart updatedSparePart) {
    if (sparePartRepository.existsById(id)) {
      updatedSparePart.setId(id);
      sparePartRepository.save(updatedSparePart);
      return true;
    }
    return false;
  }

  @Override
  public Optional<SparePart> GetSparePartById(Long id) {
    return sparePartRepository.findById(id);
  }

  @Override
  public List<SparePart> getSparePartByModel(String model) {
    return sparePartRepository.findByModel(model);
  }

  @Override
  public List<SparePart> getSparePartByBrand(String brand) {
    return sparePartRepository.findSparePartsByBrand(brand);
  }

  @Override
  public List<SparePart> getSparePartByType(String type) {
    return sparePartRepository.findByType(type);
  }

  @Override
  public SparePart getSparePartByBrandAndTypeAndModel(String brand, String type, String model) {
    return sparePartRepository.findSparePartByBrandAndTypeAndModel(brand, type, model);
  }

  @Override
  public List<SparePart> getAllSpareParts() {
    return sparePartRepository.findAll();
  }

  @Override
  public boolean useSparePart(UsedSparePart newUsedSparePart) {
    Optional<SparePart> sparePart = sparePartRepository.findById(newUsedSparePart.getId());
    if (sparePart.isPresent() && sparePart.get().getStock() != 0 && sparePart.get().getStock() >= newUsedSparePart.getQuantity()) {
      int newStock = sparePart.get().getStock() - newUsedSparePart.getQuantity();
      sparePart.get().setStock(newStock);
      sparePartRepository.save(sparePart.get());
      return true;
    } else {
      return false;
    }
  }

  @Override
  public boolean updateUsedSparePart(Long id, UsedSparePart updatedUsedSparePart) {
    if (usedSparePartRepository.existsById(id)) {
      updatedUsedSparePart.setId(id);
      usedSparePartRepository.save(updatedUsedSparePart);
      return true;
    }
    return false;
  }

  

  @Override
  public Optional<UsedSparePart> getUsedSparePartById(Long id) {
    return usedSparePartRepository.findById(id);
  }


  @Override
  public boolean changeAvailabilitySparePart(Long id, String availability) {
    Optional<SparePart> sparePart = sparePartRepository.findById(id);
    if (sparePart.isPresent()) {
      sparePart.get().setAvailability(availability);
      sparePartRepository.save(sparePart.get());
      return true;
    }
    return false;
  }

  @Override
  public boolean addBrand(Brand brand) {
    if (!brandRepository.existsByBrandName(brand.getBrandName())) {
      brandRepository.save(brand);
      return true;
    }
    return false;
  }

  @Override
  public Optional<Brand> getBrandByName(String brandName) {
    return brandRepository.findByBrandName(brandName);
  }

  @Override
  public List<Brand> getAllBrands() {
    return brandRepository.findAll();
  }

  @Override
  public boolean addType(Type type) {
    if (!typeRepository.existsByTypeName(type.getTypeName())) {
      typeRepository.save(type);
      return true;
    }
    return false;
  }

  @Override
  public Optional<Type> getTypeByName(String typeName) {
    return typeRepository.findByTypeName(typeName);
  }

  @Override
  public List<Type> getAllTypes() {
    return typeRepository.findAll();
  }
}