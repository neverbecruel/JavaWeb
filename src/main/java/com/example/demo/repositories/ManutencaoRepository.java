package com.example.demo.repositories;

import com.example.demo.models.Manutencao;
import com.example.demo.models.Manutencao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {
    List<Manutencao> findByMachineId(Long machineId);
}
