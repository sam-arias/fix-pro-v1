package com.localMantenimiento.fixpro.spare_part.service;

import com.localMantenimiento.fixpro.interventions.model.InterventionDetails;
import com.localMantenimiento.fixpro.interventions.repository.InterventionDetailsRepository;
import com.localMantenimiento.fixpro.spare_part.model.BrandSparePart;
import com.localMantenimiento.fixpro.spare_part.model.SparePart;
import com.localMantenimiento.fixpro.spare_part.model.TypeSparePart;
import com.localMantenimiento.fixpro.spare_part.model.UsedSparePart;
import com.localMantenimiento.fixpro.spare_part.repository.BrandSparePartRepository;
import com.localMantenimiento.fixpro.spare_part.repository.SparePartRepository;
import com.localMantenimiento.fixpro.spare_part.repository.TypeSparePartRepository;
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
  private BrandSparePartRepository brandSparePartRepository;
  @Autowired
  private TypeSparePartRepository typeSparePartRepository;
  @Autowired
  private InterventionDetailsRepository interventionDetailsRepository;

  @Override
  public boolean registerSparePart(SparePart sparePart) {
    if (!sparePartRepository.existsByBrandSparePartBrandNameAndTypeSparePartTypeNameAndModel(sparePart.getBrandSparePart().getBrandName(), sparePart.getTypeSparePart().getTypeName(), sparePart.getModel())) {
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

    return sparePartRepository.findByBrandSparePartBrandNameAndTypeSparePartTypeNameAndModel(brand, type, model);
  }

  @Override
  public List<SparePart> getAllSpareParts() {
    return sparePartRepository.findAll();
  }

  @Override
  public boolean useSparePart(UsedSparePart newUsedSparePart) {
    Optional<SparePart> sparePart = sparePartRepository.findById(newUsedSparePart.getSparePart().getId());

    if (sparePart.isPresent() && sparePart.get().getStock() != 0 && sparePart.get().getStock() >= newUsedSparePart.getQuantity()) {
      int newStock = sparePart.get().getStock() - newUsedSparePart.getQuantity();
      sparePart.get().setStock(newStock);

      InterventionDetails interventionDetails = interventionDetailsRepository.getInterventionDetailsById(newUsedSparePart.getInterventionDetails().getId());
      interventionDetails.setId(newUsedSparePart.getInterventionDetails().getId());
      float newTotalCost = interventionDetails.getTotalCost() + newUsedSparePart.getCostSpareParts();
      interventionDetails.setTotalCost(newTotalCost);

      interventionDetailsRepository.save(interventionDetails);
      sparePartRepository.save(sparePart.get());
      usedSparePartRepository.save(newUsedSparePart);
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
  public boolean addBrand(BrandSparePart brandSparePart) {
    if (!brandSparePartRepository.existsByBrandName(brandSparePart.getBrandName())) {
      brandSparePartRepository.save(brandSparePart);
      return true;
    }
    return false;
  }

  @Override
  public Optional<BrandSparePart> getBrandByName(String brandName) {
    return brandSparePartRepository.findByBrandName(brandName);
  }

  @Override
  public List<BrandSparePart> getAllBrands() {
    return brandSparePartRepository.findAll();
  }

  @Override
  public boolean addType(TypeSparePart typeSparePart) {
    if (!typeSparePartRepository.existsByTypeName(typeSparePart.getTypeName())) {
      typeSparePartRepository.save(typeSparePart);
      return true;
    }
    return false;
  }

  @Override
  public Optional<TypeSparePart> getTypeByName(String typeName) {
    return typeSparePartRepository.findByTypeName(typeName);
  }

  @Override
  public List<TypeSparePart> getAllTypes() {
    return typeSparePartRepository.findAll();
  }

  @Override
  public  boolean deleteUsedSparePart(Long id) {
    if(usedSparePartRepository.existsById(id)) {
      UsedSparePart usedSparePart = usedSparePartRepository.findById(id).get();
      SparePart sparePart = usedSparePart.getSparePart();
      sparePart.setStock(sparePart.getStock() + usedSparePart.getQuantity());

      InterventionDetails interventionDetails = interventionDetailsRepository.getInterventionDetailsById(usedSparePart.getInterventionDetails().getId());
      float newTotalCost = interventionDetails.getTotalCost() - usedSparePart.getCostSpareParts();
      interventionDetails.setTotalCost(newTotalCost);

      interventionDetailsRepository.save(interventionDetails);
      sparePartRepository.save(sparePart);
      usedSparePartRepository.deleteById(id);
      return true;
    }
    return false;
  }


  @Override
  public List<UsedSparePart> getUsedSparePartsByInterventiondetailsId(Long interventionDetailsId) {
    return usedSparePartRepository.findUsedSparePartByinterventionDetailsId(interventionDetailsId);
  }
}