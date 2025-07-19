package com.epharmacien;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.epharmacien")
public class EPharmacienApplication {

    public static void main(String[] args) {
        SpringApplication.run(EPharmacienApplication.class, args);
    }
}