package com.example.demo.service;

import com.example.demo.models.Manutencao;

import java.util.Optional;

public interface ManutencaoService {
    Manutencao saveManutencao(Manutencao manutencao);
    Optional<Manutencao> getManutencaoById(Long id);

}
