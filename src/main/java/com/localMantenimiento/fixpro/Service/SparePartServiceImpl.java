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
  public Optional<SparePart> GetSparePartById(Long personId) {
    return sparePartRepository.findById(personId);
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
  public String UpdateSparePart(Long SparePartId, SparePart updatedSparePart) {
    return "";
  }

  @Override
  public String DeleteSparePart(Long SparePartId) {
    return "";
  }
}
