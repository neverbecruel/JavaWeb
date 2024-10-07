package com.example.demo.controller;

import com.example.demo.entities.Maquina;
import com.example.demo.service.MaquinaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PostNewMachine {

    private static final Logger logger = LoggerFactory.getLogger(PostNewMachine.class);
    private final MaquinaService maquinaService;

    @Autowired
    public PostNewMachine(MaquinaService maquinaService) {
        this.maquinaService = maquinaService;
    }

    @PostMapping("/maquinas")
    public ResponseEntity<?> criarMaquina(@RequestBody Maquina maquina) {
        try {
            logger.info("Receiving request to create machine: {}", maquina);

            // Validar se o patrimônio já existe
            if (maquinaService.existsByPatrimonio(maquina.getPatrimonio())) {
                String errorMessage = "Já existe uma máquina com o patrimônio " + maquina.getPatrimonio() + ".";
                logger.info(errorMessage);
                return ResponseEntity.status(400).body("Patrimônio já existe.");
            }

            Maquina savedMaquina = maquinaService.saveMaquina(maquina);
            Long maquinaId = savedMaquina.getId();

            logger.info("Successfully created maquina: {}", maquinaId);
            return ResponseEntity.status(HttpStatus.CREATED).body(maquinaId);
        } catch (DataIntegrityViolationException e) {
            logger.info("Database integrity violation: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: Valor duplicado encontrado.");
        } catch (IllegalArgumentException e) {
            logger.info("Validation error occurred: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        } catch (Exception e) {
            logger.info("Error occurred while adding machine: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao adicionar máquina: " + e.getMessage());
        }
    }
}
