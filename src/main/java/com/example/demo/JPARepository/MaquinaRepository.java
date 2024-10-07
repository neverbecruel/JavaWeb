package com.example.demo.JPARepository;

import com.example.demo.entities.Maquina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MaquinaRepository extends JpaRepository<Maquina, Long> {
    Optional<Maquina> findByPatrimonio(int patrimonio);


}
