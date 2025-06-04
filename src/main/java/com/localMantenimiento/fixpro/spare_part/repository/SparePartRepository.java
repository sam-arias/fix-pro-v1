package com.localMantenimiento.fixpro.spare_part.repository;

import com.localMantenimiento.fixpro.spare_part.model.SparePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SparePartRepository extends JpaRepository<SparePart, Long> {
  @Query("SELECT sp FROM SparePart sp JOIN FETCH sp.typeSparePart t WHERE t.typeName = :type")
  List<SparePart> findByType(@Param("type") String type);
  List<SparePart> findByModel(String model);

  @Query("SELECT sp FROM SparePart sp JOIN FETCH sp.brandSparePart b WHERE b.brandName = :brand")
  List<SparePart> findSparePartsByBrand(@Param("brand") String brand);

  @Query("SELECT sp FROM SparePart sp JOIN sp.brandSparePart b JOIN sp.typeSparePart t WHERE  (b.brandName = :brand AND  t.typeName = :type AND sp.model = :model)")
  SparePart findSparePartByBrandAndTypeAndModel(@Param("brand") String brand, @Param("type") String type, @Param("model") String model);

  SparePart findByBrandSparePartBrandNameAndTypeSparePartTypeNameAndModel(String brand, String type, String model);

  boolean existsByBrandSparePartBrandNameAndTypeSparePartTypeNameAndModel(String brand, String type, String model);
  boolean existsById(Long id);
}