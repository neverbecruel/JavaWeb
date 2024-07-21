package com.example.demo.controller;

import com.example.demo.models.Manutencao;
import com.example.demo.service.ManutencaoProv;
import com.example.demo.service.ManutencaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ManutencaoController {

    private final ManutencaoService  manutencaoService;

    @Autowired
    public ManutencaoController(ManutencaoService manutencaoService) {
        this.manutencaoService = manutencaoService;
    }
    @PostMapping("/postManutencao")
    public Long getIDMachine(@RequestBody ManutencaoProv manutencao) {

        System.out.println(manutencao.getId());
        System.out.println(manutencao.getData());
        System.out.println(manutencao.getDescricao());
        return 0L;
    }

}
