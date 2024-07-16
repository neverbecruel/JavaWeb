package com.example.demo.service;

import com.example.demo.models.Maquina;
import com.example.demo.repositories.MaquinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MaquinaServiceImpl implements MaquinaService {

    private final MaquinaRepository maquinaRepository;

    @Autowired
    public MaquinaServiceImpl(MaquinaRepository maquinaRepository) {
        this.maquinaRepository = maquinaRepository;
    }

    @Override
    public Maquina saveMaquina(Maquina maquina) {
        return maquinaRepository.save(maquina);
    }

    @Override
    public Optional<Maquina> getMachineById(Long id) {
        return maquinaRepository.findById(id);
    }
}
