package com.example.demo.controller;

import com.example.demo.models.Maquina;
import com.example.demo.service.MaquinaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class IndexController {

    private static final Logger logger = LoggerFactory.getLogger(IndexController.class);
    private final MaquinaService maquinaService;

    @Autowired
    public IndexController(MaquinaService maquinaService) {
        this.maquinaService = maquinaService;
    }

    @PostMapping("/maquinas")
    public ResponseEntity<?> criarMaquina(@RequestBody Maquina maquina) {
        try{
            logger.info("Receiving request to create machine: {}", maquina);

            Maquina savedMaquina = maquinaService.saveMaquina(maquina);
            Long maquinaId = savedMaquina.getId();

            logger.info("Successfully created maquina: {}", maquinaId);
            return ResponseEntity.status(HttpStatus.CREATED).body(maquinaId);
        } catch(IllegalArgumentException e){
            logger.info("Validation error ocurred: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Erro: "+ e.getMessage());
        }catch (Exception e){
            logger.info("Error ocurred while adding machine: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao adicionar máquina: "+ e.getMessage());
        }
    }
}
