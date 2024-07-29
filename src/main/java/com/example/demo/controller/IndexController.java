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
        try{maquinaService.saveMaquina(maquina);
        } catch(Exception e){
            System.out.println(e.getMessage());
            return -1l;
        }

        System.out.println("Maquina"+ maquina.getId() +" criada com sucesso!");
        return maquina.getId();
    }
}
