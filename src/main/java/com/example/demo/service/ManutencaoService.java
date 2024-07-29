package com.example.demo.service;

import com.example.demo.models.Manutencao;

import java.util.List;
import java.util.Optional;

public interface ManutencaoService {
    Manutencao saveManutencao(Manutencao manutencao);
    List<Manutencao> getManutencoesById(Long machineID);

}
