package com.epharmacien.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "pharmacies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pharmacy {
    
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    
    @Column(name = "nom", nullable = false)
    private String nom;
    
    @Column(name = "adresse", nullable = false)
    private String adresse;
    
    @Column(name = "ville", nullable = false)
    private String ville;
    
    @Column(name = "latitude", nullable = false)
    private Double latitude;
    
    @Column(name = "longitude", nullable = false)
    private Double longitude;
    
    @Column(name = "location", columnDefinition = "geometry(Point,4326)")
    private Point location;
    
    @Column(name = "ouverte")
    private Boolean ouverte = true;
    
    @Column(name = "garde")
    private Boolean garde = false;
    
    @Column(name = "nuit")
    private Boolean nuit = false;
    
    @Column(name = "ouverture")
    private LocalTime ouverture = LocalTime.of(8, 0);
    
    @Column(name = "fermeture")
    private LocalTime fermeture = LocalTime.of(20, 0);
    
    @Column(name = "telephone")
    private String telephone;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
} 