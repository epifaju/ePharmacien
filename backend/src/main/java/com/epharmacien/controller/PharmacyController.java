package com.epharmacien.controller;

import com.epharmacien.dto.PharmacyDto;
import com.epharmacien.service.PharmacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/pharmacies")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PharmacyController {

    private final PharmacyService pharmacyService;

    // Endpoints publics
    @GetMapping
    public ResponseEntity<List<PharmacyDto>> getAllPharmacies(
            @RequestParam(required = false) String ville,
            @RequestParam(required = false) Boolean ouverte,
            @RequestParam(required = false) Boolean garde,
            @RequestParam(required = false) Boolean nuit) {

        if (ville != null && !ville.trim().isEmpty()) {
            if (ouverte != null && ouverte) {
                return ResponseEntity.ok(pharmacyService.getPharmaciesByVilleAndOpen(ville));
            } else if (garde != null && garde) {
                return ResponseEntity.ok(pharmacyService.getPharmaciesByVilleAndOnDuty(ville));
            } else if (nuit != null && nuit) {
                return ResponseEntity.ok(pharmacyService.getPharmaciesByVilleAndNight(ville));
            } else {
                return ResponseEntity.ok(pharmacyService.getPharmaciesByVille(ville));
            }
        } else {
            if (ouverte != null && ouverte) {
                return ResponseEntity.ok(pharmacyService.getOpenPharmacies());
            } else if (garde != null && garde) {
                return ResponseEntity.ok(pharmacyService.getOnDutyPharmacies());
            } else if (nuit != null && nuit) {
                return ResponseEntity.ok(pharmacyService.getNightPharmacies());
            } else {
                return ResponseEntity.ok(pharmacyService.getAllPharmacies());
            }
        }
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<PharmacyDto>> getNearbyPharmacies(
            @RequestParam Double lat,
            @RequestParam Double lon,
            @RequestParam(defaultValue = "5.0") Double radius,
            @RequestParam(required = false) Boolean ouverte,
            @RequestParam(required = false) Boolean garde) {

        if (ouverte != null && ouverte) {
            return ResponseEntity.ok(pharmacyService.getNearbyOpenPharmacies(lat, lon, radius));
        } else if (garde != null && garde) {
            return ResponseEntity.ok(pharmacyService.getNearbyOnDutyPharmacies(lat, lon, radius));
        } else {
            return ResponseEntity.ok(pharmacyService.getNearbyPharmacies(lat, lon, radius));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PharmacyDto> getPharmacyById(@PathVariable UUID id) {
        return pharmacyService.getPharmacyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoints admin (protégés par JWT)
    @PostMapping
    public ResponseEntity<PharmacyDto> createPharmacy(@Valid @RequestBody PharmacyDto pharmacyDto) {
        PharmacyDto created = pharmacyService.createPharmacy(pharmacyDto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PharmacyDto> updatePharmacy(
            @PathVariable UUID id,
            @Valid @RequestBody PharmacyDto pharmacyDto) {
        return pharmacyService.updatePharmacy(id, pharmacyDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePharmacy(@PathVariable UUID id) {
        if (pharmacyService.deletePharmacy(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}