package com.epharmacien.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class LoginRequest {
    
    @NotBlank(message = "Le nom d'utilisateur est requis")
    private String username;
    
    @NotBlank(message = "Le mot de passe est requis")
    private String password;
} 