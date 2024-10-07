package com.example.demo.service;

import com.example.demo.entities.Maquina;

import java.util.Optional;

public interface MaquinaService {
    Maquina saveMaquina(Maquina maquina);
    boolean existsByPatrimonio(int patrimonio);
    Optional<Maquina> getMachineById(Long id);
    Optional<Maquina> getMachineByPatrimonio(int patrimonio);
    boolean deleteMaquina(Long id);
}
