package com.example.demo.repositories;

import com.example.demo.models.Maquina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MaquinaRepository extends JpaRepository<Maquina, Long> {
    Optional<Maquina> findByPatrimonio(int patrimonio);


}
