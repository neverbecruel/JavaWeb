package com.example.demo.repositories;

import com.example.demo.models.Maquina;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaquinaRepository extends JpaRepository<Maquina, Long> {
}
