package com.example.demo.service;

import com.example.demo.entities.Manutencao;

import java.util.List;

public interface ManutencaoService {
    Manutencao saveManutencao(Manutencao manutencao);
    List<Manutencao> getManutencoesById(Long machineID);

}
