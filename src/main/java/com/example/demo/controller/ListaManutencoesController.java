package com.example.demo.controller;

import com.example.demo.models.Manutencao;
import com.example.demo.service.ManutencaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ListaManutencoesController {

    private final ManutencaoService manutencaoService;

    @Autowired
    public ListaManutencoesController(ManutencaoService manutencaoService) {
        this.manutencaoService = manutencaoService;
    }

    @GetMapping("/manutencoes/{machineId}")
    public List<Manutencao> getManutencoesByMachineId(@PathVariable Long machineId) {
        //System.out.println(manutencaoService.getManutencoesById(machineId));
        return manutencaoService.getManutencoesById(machineId);
    }
}
