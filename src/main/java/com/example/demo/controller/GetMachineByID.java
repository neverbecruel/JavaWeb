package com.example.demo.controller;

import com.example.demo.entities.Maquina;
import com.example.demo.service.MaquinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
public class GetMachineByID {

    private final MaquinaService maquinaService;

    @Autowired
    public GetMachineByID(MaquinaService maquinaService) {
        this.maquinaService = maquinaService;
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/maquinas/{id}")
    public ResponseEntity<?> getMachineById(@PathVariable Long id) {

        Optional<Maquina> machineOptional = maquinaService.getMachineById(id);
        if (machineOptional.isPresent()) {
            Maquina maquina = machineOptional.get();

            // Construir o caminho para o arquivo 'ByID.html'
            String filePath = "src/main/resources/static/ByID.html";
            Path path = Paths.get(filePath);

            // Lê o conteúdo do arquivo 'ByID.html' como string
            String htmlContent;
            try {
                htmlContent = Files.readString(path);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.notFound().build();
            }

            // Substituir os marcadores de lugar no HTML com os dados da máquina
            htmlContent = htmlContent.replace("{machineNumero}", String.valueOf(maquina.getNumeroMaquina()));
            htmlContent = htmlContent.replace("{machinePatrimonio}", String.valueOf(maquina.getPatrimonio()));
            htmlContent = htmlContent.replace("{machineSetor}", maquina.getSetor());
            htmlContent = htmlContent.replace("{machineModelo}", maquina.getModelo());
            htmlContent = htmlContent.replace("{machineId}", maquina.getId().toString());
            htmlContent = htmlContent.replace("{machineAgulhagem}",String.valueOf(maquina.getAgulhagem()));
            htmlContent = htmlContent.replace("{machineDiametro}", String.valueOf(maquina.getDiametro()));

            // Retornar o HTML personalizado
            return ResponseEntity.ok(htmlContent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
