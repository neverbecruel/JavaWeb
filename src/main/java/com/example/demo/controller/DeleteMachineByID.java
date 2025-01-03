package com.example.demo.controller;

import com.example.demo.service.MaquinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller

public class DeleteMachineByID {

    private final MaquinaService maquinaService;

    @Autowired
    public DeleteMachineByID(MaquinaService maquinaService) {
        this.maquinaService = maquinaService;
    }

    @CrossOrigin("*")
    @DeleteMapping("/maquinas/delete/{id}")
    public ResponseEntity<?> deleteMachineByID(@PathVariable Long id) {
        boolean deletado;
        deletado = maquinaService.deleteMaquina(id);
        if (deletado) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
