package com.example.demo.service;

import com.example.demo.models.Manutencao;
import com.example.demo.repositories.ManutencaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ManutencaoServiceImpl implements ManutencaoService {

    private final ManutencaoRepository manutencaoRepository;

    @Autowired
    public ManutencaoServiceImpl(ManutencaoRepository manutencaoRepository) {
        this.manutencaoRepository = manutencaoRepository;
    }

    @Override
    public Manutencao saveManutencao(Manutencao manutencao) {
        return manutencaoRepository.save(manutencao);
    }

    @Override
    public List<Manutencao> getManutencoesById(Long machineId) {
        return manutencaoRepository.findByMachineId(machineId);
    }

}