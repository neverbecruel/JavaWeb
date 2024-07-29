package com.example.demo.controller;

import com.example.demo.models.Manutencao;
import com.example.demo.models.Maquina;
import com.example.demo.service.ManutencaoProv;
import com.example.demo.service.ManutencaoService;
import com.example.demo.service.MaquinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ManutencaoController {

    private final ManutencaoService manutencaoService;
    private final MaquinaService maquinaService;

    @Autowired
    public ManutencaoController(ManutencaoService manutencaoService, MaquinaService maquinaService) {
        this.manutencaoService = manutencaoService;
        this.maquinaService = maquinaService;
    }

    @PostMapping("/postManutencao")
    public Long getIDMachine(@RequestBody ManutencaoProv maquina) {
        System.out.println(maquina.getId());
        System.out.println(maquina.getData());
        System.out.println(maquina.getDescricao());

        Optional<Maquina> machine = maquinaService.getMachineById(maquina.getId());
        if (machine.isPresent()) {
            Manutencao manutencao = new Manutencao();
            manutencao.setMachine(machine.get());
            manutencao.setDate(maquina.getData());
            manutencao.setDescription(maquina.getDescricao());
            manutencaoService.saveManutencao(manutencao);
        } else {
            System.out.println("Máquina não encontrada");
        }

        return 0L;
    }
}
