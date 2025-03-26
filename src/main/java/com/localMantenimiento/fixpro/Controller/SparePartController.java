package com.localMantenimiento.fixpro.Controller;

import com.localMantenimiento.fixpro.Entity.SparePart;
import com.localMantenimiento.fixpro.Repository.SparePartRepository;
import com.localMantenimiento.fixpro.Service.SparePartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sparepart")
public class SparePartController {
  @Autowired
  SparePartRepository sparePartRepository;
  @Autowired
  private SparePartService sparePartService;

  @PostMapping
  public String RegisterSparePart(@RequestBody SparePart sparePart) {
    return sparePartService.RegisterSparePart(sparePart);
  }

  @GetMapping("/{sparePartId}")
  public Optional<SparePart> GetSparePartById(@PathVariable Long sparePartId) {
    return sparePartService.GetSparePartById(sparePartId);
  }

  @GetMapping("/{name}")
  public Optional<SparePart> GetSparePartByName(@PathVariable String name){
    return sparePartService.GetSparePartByName(name);
  }

  @GetMapping("all")
  public List<SparePart> GetAllSpareParts() {
    return sparePartService.GetAllSpareParts();
  }

  @GetMapping("/{brand}")
  public List<SparePart> GetSparePartByBrand(@PathVariable String brand) {
    return sparePartService.GetSparePartByBrand(brand);
  }



  @PutMapping("/{sparePartId}")
  public String UpdateSparePart(@PathVariable Long sparePartId, @RequestBody SparePart updatedSparePart) {
    return sparePartService.UpdateSparePart(sparePartId,updatedSparePart);
  }

  @DeleteMapping("/{sparePartId}")
  public String DeleteSparePart(@PathVariable Long sparePartId) {
    return sparePartService.DeleteSparePart(sparePartId);
  }



}
