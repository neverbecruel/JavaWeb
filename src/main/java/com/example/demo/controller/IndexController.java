package com.example.demo.controller;

import com.example.demo.models.Maquina;
import com.example.demo.service.MaquinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class IndexController {

    private final MaquinaService maquinaService;

    @Autowired
    public IndexController(MaquinaService maquinaService) {
        this.maquinaService = maquinaService;
    }

    @PostMapping("/maquinas")
    public Long criarMaquinas(@RequestBody Maquina maquina) {
        maquinaService.saveMaquina(maquina);
        System.out.println("Maquina criada com sucesso!");
        return maquina.getId();
    }
}
