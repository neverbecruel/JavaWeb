package com.example.demo.models;

import com.sun.istack.NotNull;
import org.apache.logging.log4j.message.StringFormattedMessage;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Manutencao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private LocalDate date;
    @NotNull
    private String description;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "machine_id")
    private Maquina machine;


    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Maquina getMachine() {
        return machine;
    }

    public void setMachine(Maquina machine) {
        this.machine = machine;
    }

}
