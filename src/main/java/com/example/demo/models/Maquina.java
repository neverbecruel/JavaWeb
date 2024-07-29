package com.example.demo.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.List;


@Entity
public class Maquina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private short numeroMaquina;
    @Column(unique = true, nullable = false)
    private int patrimonio;
    @NotNull
    private String setor;
    @NotNull
    private String modelo;
    @NotNull
    private short agulhagem;
    @NotNull
    private byte diametro;



    @NotNull
    @OneToMany(mappedBy = "machine", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Manutencao> maintenanceRecords;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public short getNumeroMaquina() {
        return numeroMaquina;
    }

    public void setNumeroMaquina(short numeroMaquina) {
        this.numeroMaquina = numeroMaquina;
    }

    public void setSetor(String setor) {this.setor = setor;}

    public String getSetor() {return setor;}

    public String getModelo() {return modelo;}

    public void setModelo(String modelo) {this.modelo = modelo;}

    public short getAgulhagem() {
        return agulhagem;
    }

    public void setAgulhagem(short agulhagem) {
        this.agulhagem = agulhagem;
    }

    public byte getDiametro() {
        return diametro;
    }

    public void setDiametro(byte diametro) {
        this.diametro = diametro;
    }

    public int getPatrimonio(){return patrimonio;}
    public void setPatrimonio(int patrimonio){this.patrimonio = patrimonio;}

    public List<Manutencao> getMaintenanceRecords() {
        return maintenanceRecords;
    }

    public void setMaintenanceRecords(List<Manutencao> maintenanceRecords) {
        this.maintenanceRecords = maintenanceRecords;
    }
}