package com.example.demo.service.impl;

import com.example.demo.entities.Manutencao;
import com.example.demo.JPARepository.ManutencaoRepository;
import com.example.demo.service.ManutencaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


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