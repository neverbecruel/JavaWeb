package com.example.demo.controller;

import com.example.demo.entities.Maquina;
import com.example.demo.service.MaquinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/getIdbyPat")
@CrossOrigin(origins = "*")
public class GetMachineID {

    private final MaquinaService maquinaService;

    @Autowired
    public GetMachineID(MaquinaService maquinaService) {
        this.maquinaService = maquinaService;
    }

    @GetMapping("/{patrimonio}")
    public ResponseEntity<?> getIdByPatrimonio(@PathVariable("patrimonio") int patrimonio) {
        // Buscar a máquina com base no patrimônio
        Optional<Maquina> maquina = maquinaService.getMachineByPatrimonio(patrimonio);

        if (maquina.isPresent()) {
            // Retornar o ID da máquina
            return ResponseEntity.ok(maquina.get().getId());
        } else {
            // Retornar 404 se a máquina não for encontrada
            return ResponseEntity.status(404).body("Máquina não encontrada.");
        }
    }
}
