package com.epharmacien.service;

import com.epharmacien.dto.LoginRequest;
import com.epharmacien.dto.LoginResponse;
import com.epharmacien.entity.Admin;
import com.epharmacien.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminRepository adminRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest loginRequest) {
        Admin admin = adminRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), admin.getPasswordHash())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        String token = jwtService.generateToken(new org.springframework.security.core.userdetails.User(
                admin.getUsername(),
                admin.getPasswordHash(),
                java.util.Collections.emptyList()));

        return new LoginResponse(token, "Connexion réussie", admin.getUsername());
    }

    public boolean validateToken(String token) {
        try {
            String username = jwtService.extractUsername(token);
            Admin admin = adminRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            return jwtService.isTokenValid(token, new org.springframework.security.core.userdetails.User(
                    admin.getUsername(),
                    admin.getPasswordHash(),
                    java.util.Collections.emptyList()));
        } catch (Exception e) {
            return false;
        }
    }
}