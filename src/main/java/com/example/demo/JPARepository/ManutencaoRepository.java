package com.example.demo.JPARepository;

import com.example.demo.entities.Manutencao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {
    List<Manutencao> findByMachineId(Long machineId);
}
