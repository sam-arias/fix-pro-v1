package com.localMantenimiento.fixpro.Service;

import com.localMantenimiento.fixpro.Entity.SparePart;
import com.localMantenimiento.fixpro.Repository.SparePartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SparePartServiceImpl implements SparePartService {
  @Autowired
  SparePartRepository sparePartRepository;

  @Override
  public String RegisterSparePart(SparePart sparePart) {
    String message;

    if(sparePartRepository.existsByName(sparePart.getName())) {
      message = "SparePart Already Exists";
    }else {
      sparePart.enableStatus();
      sparePartRepository.save(sparePart);
      message = "SparePart Registered Successfully";
    }
    return message;
  }

  @Override
  public Optional<SparePart> GetSparePartById(Long sparePartId) {
    return sparePartRepository.findById(sparePartId);
  }

  @Override
  public Optional<SparePart> GetSparePartByName(String name) {
    return sparePartRepository.findByName(name);
  }

  @Override
  public List<SparePart> GetSparePartByBrand(String brand) {
    return sparePartRepository.findByBrand(brand);
  }

  @Override
  public String UpdateSparePart(Long sparePartId, SparePart updatedSparePart) {
    String message;
    if(sparePartRepository.existsById(sparePartId)) {
      SparePart existingSparePart = sparePartRepository.findById(sparePartId).get();
      if (updatedSparePart.getName() != null) {
        existingSparePart.setName(updatedSparePart.getName());
      }
      if (updatedSparePart.getBrand() != null) {
        existingSparePart.setBrand(updatedSparePart.getBrand());
      }
      if (updatedSparePart.getPrice() != null) {
        existingSparePart.setPrice(updatedSparePart.getPrice());
      }
      sparePartRepository.save(existingSparePart);
      message = "SparePart Updated Successfully";
    }else {
      message = "SparePart Not Found";
    }
    return message;
  }

  @Override
  public String DeleteSparePart(Long sparePartId) {
    if(sparePartRepository.existsById(sparePartId)) {
      SparePart sparePart = sparePartRepository.getReferenceById(sparePartId);
      sparePart.disableStatus();
      return "SparePart Deleted Successfully";
    }
    return "SparePart Not Found";
  }
}
