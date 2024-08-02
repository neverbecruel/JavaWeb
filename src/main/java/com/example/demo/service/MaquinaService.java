package com.example.demo.service;

import com.example.demo.models.Maquina;

import java.util.Optional;

public interface MaquinaService {
    Maquina saveMaquina(Maquina maquina);
    boolean existsByPatrimonio(int patrimonio);
    Optional<Maquina> getMachineById(Long id);
    Optional<Maquina> getMachineByPatrimonio(int patrimonio);
}
