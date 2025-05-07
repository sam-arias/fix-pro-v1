package com.localMantenimiento.fixpro.spare_part.service;

import com.localMantenimiento.fixpro.spare_part.model.SparePart;
import com.localMantenimiento.fixpro.spare_part.model.UsedSparePart;
import com.localMantenimiento.fixpro.spare_part.repository.SparePartRepository;
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

  @Override
  public boolean registerSparePart(SparePart sparePart) {
    if (!sparePartRepository.existsSparePartByBrandAndTypeAndModel(sparePart.getBrand(), sparePart.getType(), sparePart.getModel())) {
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
  public Optional<List<SparePart>> getSparePartByModel(String model) {
    return sparePartRepository.findByModel(model);
  }

  @Override
  public Optional<List<SparePart>> getSparePartByBrand(String brand) {
    return sparePartRepository.findByBrand(brand);
  }

  @Override
  public Optional<List<SparePart>> getSparePartByType(String type) {
    return sparePartRepository.findByType(type);
  }

  @Override
  public Optional<SparePart> getSparePartByBrandAndTypeAndModel(String brand, String type, String model) {
    return sparePartRepository.findSByBrandAndTypeAndModel(brand, type, model);
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
}
