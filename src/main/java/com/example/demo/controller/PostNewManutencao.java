package com.example.demo.controller;

import com.example.demo.entities.Manutencao;
import com.example.demo.entities.Maquina;
import com.example.demo.service.ManutencaoProvisoria;
import com.example.demo.service.ManutencaoService;
import com.example.demo.service.MaquinaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PostNewManutencao {

    private static final Logger logger = LoggerFactory.getLogger(PostNewManutencao.class);
    private static final short MAX_DESCRIPTION_LENGTH = 255;
    private final ManutencaoService manutencaoService;
    private final MaquinaService maquinaService;

    @Autowired
    public PostNewManutencao(ManutencaoService manutencaoService, MaquinaService maquinaService) {
        this.manutencaoService = manutencaoService;
        this.maquinaService = maquinaService;
    }

    @PostMapping("/postManutencao")
    public ResponseEntity<?> addMaintenance(@RequestBody ManutencaoProvisoria maquina) {
        try{
        logger.info("ID: {}", maquina.getId());
        logger.info("DATA: {}", maquina.getData());
        logger.info("PROCEDIMENTO: {}", maquina.getDescricao());

        if (maquina.getDescricao().length()> MAX_DESCRIPTION_LENGTH){
            logger.warn("Descrição excede o tamanho máximo permitido de {} caracteres", MAX_DESCRIPTION_LENGTH);
            return ResponseEntity.status(400).body("Descrição excede o tamanho máximo permitido de " + MAX_DESCRIPTION_LENGTH + " caracteres.");
        }

        Optional<Maquina> machine = maquinaService.getMachineById(maquina.getId());
        if (machine.isPresent()) {
            Manutencao manutencao = new Manutencao();
            manutencao.setMachine(machine.get());
            manutencao.setDate(maquina.getData());
            manutencao.setDescription(maquina.getDescricao());

            manutencaoService.saveManutencao(manutencao);
            logger.info("Manutenção salva com sucesso");
            return ResponseEntity.status(HttpStatus.CREATED).body(manutencao.getId());
        } else {
            logger.info("Máquina não encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Máquina não encontrada.");
        }

    }catch (Exception e){
        return ResponseEntity.status(500).body("Erro adicionar manutenção: " + e.getMessage());
        }
    }
}
