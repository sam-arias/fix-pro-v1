package com.localMantenimiento.fixpro.spare_part.service;

import com.localMantenimiento.fixpro.spare_part.model.SparePart;
import com.localMantenimiento.fixpro.spare_part.repository.SparePartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SparePartServiceImpl implements SparePartService {

  @Autowired
  private SparePartRepository sparePartRepository;

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
      SparePart existingSparePart = sparePartRepository.findById(id).get();
      existingSparePart.setBrand(updatedSparePart.getBrand());
      existingSparePart.setType(updatedSparePart.getType());
      existingSparePart.setModel(updatedSparePart.getModel());
      existingSparePart.setPrice(updatedSparePart.getPrice());
      existingSparePart.setStock(updatedSparePart.getStock());
      sparePartRepository.save(existingSparePart);
      return true;
    }
    return false;
  }

  @Override
  public SparePart GetSparePartById(Long id) {
    return sparePartRepository.findById(id).get();
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
}
