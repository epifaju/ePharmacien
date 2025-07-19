package com.epharmacien.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PharmacyDto {
    
    private UUID id;
    
    @NotBlank(message = "Le nom est requis")
    private String nom;
    
    @NotBlank(message = "L'adresse est requise")
    private String adresse;
    
    @NotBlank(message = "La ville est requise")
    private String ville;
    
    @NotNull(message = "La latitude est requise")
    private Double latitude;
    
    @NotNull(message = "La longitude est requise")
    private Double longitude;
    
    private Boolean ouverte = true;
    private Boolean garde = false;
    private Boolean nuit = false;
    private LocalTime ouverture = LocalTime.of(8, 0);
    private LocalTime fermeture = LocalTime.of(20, 0);
    private String telephone;
} 