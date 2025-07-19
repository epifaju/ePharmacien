package com.epharmacien.service;

import com.epharmacien.dto.PharmacyDto;
import com.epharmacien.entity.Pharmacy;
import com.epharmacien.repository.PharmacyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PharmacyService {

    private final PharmacyRepository pharmacyRepository;

    public List<PharmacyDto> getAllPharmacies() {
        return pharmacyRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<PharmacyDto> getPharmacyById(UUID id) {
        return pharmacyRepository.findById(id)
                .map(this::convertToDto);
    }

    public List<PharmacyDto> getPharmaciesByVille(String ville) {
        return pharmacyRepository.findByVilleIgnoreCase(ville).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PharmacyDto> getOpenPharmacies() {
        return pharmacyRepository.findByOuverteTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PharmacyDto> getOnDutyPharmacies() {
        return pharmacyRepository.findByGardeTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PharmacyDto> getNightPharmacies() {
        return pharmacyRepository.findByNuitTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PharmacyDto> getPharmaciesByVilleAndOpen(String ville) {
        return pharmacyRepository.findByVilleIgnoreCaseAndOuverteTrue(ville).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PharmacyDto> getPharmaciesByVilleAndOnDuty(String ville) {
        return pharmacyRepository.findByVilleIgnoreCaseAndGardeTrue(ville).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PharmacyDto> getPharmaciesByVilleAndNight(String ville) {
        return pharmacyRepository.findByVilleIgnoreCaseAndNuitTrue(ville).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PharmacyDto> getNearbyPharmacies(Double latitude, Double longitude, Double radius) {
        return pharmacyRepository.findNearby(latitude, longitude, radius).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PharmacyDto> getNearbyOpenPharmacies(Double latitude, Double longitude, Double radius) {
        return pharmacyRepository.findNearbyOpen(latitude, longitude, radius).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<PharmacyDto> getNearbyOnDutyPharmacies(Double latitude, Double longitude, Double radius) {
        return pharmacyRepository.findNearbyOnDuty(latitude, longitude, radius).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PharmacyDto createPharmacy(PharmacyDto pharmacyDto) {
        Pharmacy pharmacy = convertToEntity(pharmacyDto);
        pharmacy = pharmacyRepository.save(pharmacy);
        return convertToDto(pharmacy);
    }

    public Optional<PharmacyDto> updatePharmacy(UUID id, PharmacyDto pharmacyDto) {
        return pharmacyRepository.findById(id)
                .map(existingPharmacy -> {
                    existingPharmacy.setNom(pharmacyDto.getNom());
                    existingPharmacy.setAdresse(pharmacyDto.getAdresse());
                    existingPharmacy.setVille(pharmacyDto.getVille());
                    existingPharmacy.setLatitude(pharmacyDto.getLatitude());
                    existingPharmacy.setLongitude(pharmacyDto.getLongitude());
                    existingPharmacy.setOuverte(pharmacyDto.getOuverte());
                    existingPharmacy.setGarde(pharmacyDto.getGarde());
                    existingPharmacy.setNuit(pharmacyDto.getNuit());
                    existingPharmacy.setOuverture(pharmacyDto.getOuverture());
                    existingPharmacy.setFermeture(pharmacyDto.getFermeture());
                    existingPharmacy.setTelephone(pharmacyDto.getTelephone());

                    return convertToDto(pharmacyRepository.save(existingPharmacy));
                });
    }

    public boolean deletePharmacy(UUID id) {
        if (pharmacyRepository.existsById(id)) {
            pharmacyRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private PharmacyDto convertToDto(Pharmacy pharmacy) {
        PharmacyDto dto = new PharmacyDto();
        dto.setId(pharmacy.getId());
        dto.setNom(pharmacy.getNom());
        dto.setAdresse(pharmacy.getAdresse());
        dto.setVille(pharmacy.getVille());
        dto.setLatitude(pharmacy.getLatitude());
        dto.setLongitude(pharmacy.getLongitude());
        dto.setOuverte(pharmacy.getOuverte());
        dto.setGarde(pharmacy.getGarde());
        dto.setNuit(pharmacy.getNuit());
        dto.setOuverture(pharmacy.getOuverture());
        dto.setFermeture(pharmacy.getFermeture());
        dto.setTelephone(pharmacy.getTelephone());
        return dto;
    }

    private Pharmacy convertToEntity(PharmacyDto dto) {
        Pharmacy pharmacy = new Pharmacy();
        pharmacy.setId(dto.getId());
        pharmacy.setNom(dto.getNom());
        pharmacy.setAdresse(dto.getAdresse());
        pharmacy.setVille(dto.getVille());
        pharmacy.setLatitude(dto.getLatitude());
        pharmacy.setLongitude(dto.getLongitude());
        pharmacy.setOuverte(dto.getOuverte());
        pharmacy.setGarde(dto.getGarde());
        pharmacy.setNuit(dto.getNuit());
        pharmacy.setOuverture(dto.getOuverture());
        pharmacy.setFermeture(dto.getFermeture());
        pharmacy.setTelephone(dto.getTelephone());
        return pharmacy;
    }
}