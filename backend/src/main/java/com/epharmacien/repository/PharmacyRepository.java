package com.epharmacien.repository;

import com.epharmacien.entity.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PharmacyRepository extends JpaRepository<Pharmacy, UUID> {

    List<Pharmacy> findByVilleIgnoreCase(String ville);

    List<Pharmacy> findByOuverteTrue();

    List<Pharmacy> findByGardeTrue();

    List<Pharmacy> findByNuitTrue();

    List<Pharmacy> findByVilleIgnoreCaseAndOuverteTrue(String ville);

    List<Pharmacy> findByVilleIgnoreCaseAndGardeTrue(String ville);

    List<Pharmacy> findByVilleIgnoreCaseAndNuitTrue(String ville);

    @Query(value = "SELECT p.* FROM pharmacies p " +
            "WHERE ST_DWithin(p.location, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326), :radius) " +
            "ORDER BY ST_Distance(p.location, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326))", nativeQuery = true)
    List<Pharmacy> findNearby(@Param("latitude") Double latitude,
            @Param("longitude") Double longitude,
            @Param("radius") Double radius);

    @Query(value = "SELECT p.* FROM pharmacies p " +
            "WHERE ST_DWithin(p.location, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326), :radius) " +
            "AND p.ouverte = true " +
            "ORDER BY ST_Distance(p.location, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326))", nativeQuery = true)
    List<Pharmacy> findNearbyOpen(@Param("latitude") Double latitude,
            @Param("longitude") Double longitude,
            @Param("radius") Double radius);

    @Query(value = "SELECT p.* FROM pharmacies p " +
            "WHERE ST_DWithin(p.location, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326), :radius) " +
            "AND p.garde = true " +
            "ORDER BY ST_Distance(p.location, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326))", nativeQuery = true)
    List<Pharmacy> findNearbyOnDuty(@Param("latitude") Double latitude,
            @Param("longitude") Double longitude,
            @Param("radius") Double radius);
}