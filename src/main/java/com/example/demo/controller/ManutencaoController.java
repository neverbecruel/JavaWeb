package com.example.demo.controller;

import com.example.demo.models.Manutencao;
import com.example.demo.models.Maquina;
import com.example.demo.service.ManutencaoProv;
import com.example.demo.service.ManutencaoService;
import com.example.demo.service.MaquinaService;
import com.example.demo.service.MaquinaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ManutencaoController {

    private final ManutencaoService  manutencaoService;
    private MaquinaService maquinaService;
    private Manutencao manutencao;

    @Autowired
    public ManutencaoController(ManutencaoService manutencaoService, MaquinaServiceImpl maquinaService, Manutencao manutencao) {
        this.manutencaoService = manutencaoService;
    }
    @PostMapping("/postManutencao")
    public Long getIDMachine(@RequestBody ManutencaoProv maquina) {
        System.out.println(maquina.getId());
        System.out.println(maquina.getData());
        System.out.println(maquina.getDescricao());
        Optional<Maquina> machine = maquinaService.getMachineById(maquina.getId());
        machine.ifPresent(value -> manutencao.setMachine(value));


        return 0L;
    }

}
