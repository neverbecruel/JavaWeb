package com.example.demo.controller;

import com.example.demo.Jsons;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class IndexController {

    @GetMapping("/json")
    public Jsons index() {
        return new Jsons("joao", "victor", "machado");
    }
}
