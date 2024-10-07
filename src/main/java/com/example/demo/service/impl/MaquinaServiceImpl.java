package com.example.demo.service.impl;

import com.example.demo.entities.Maquina;
import com.example.demo.JPARepository.MaquinaRepository;
import com.example.demo.service.MaquinaService;
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
    @Override
    public boolean existsByPatrimonio(int patrimonio) {
        return maquinaRepository.findByPatrimonio(patrimonio).isPresent();
    }
    @Override
    public Optional<Maquina> getMachineByPatrimonio(int patrimonio) {
        return maquinaRepository.findByPatrimonio(patrimonio);
    }

    @Override
    public boolean deleteMaquina(Long id){
        if (maquinaRepository.existsById(id)){
            maquinaRepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }
}
