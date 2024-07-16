package com.example.demo.models;
import javax.persistence.*;
import java.util.List;


@Entity
public class Maquina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private short patrimonio;
    private String setor;
    private String modelo;

    // Other machine-specific attributes

    @OneToMany(mappedBy = "machine", cascade = CascadeType.ALL)
    private List<Manutencao> maintenanceRecords;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSetor(String setor) {this.setor = setor;}

    public String getSetor() {return setor;}

    public String getModelo() {return modelo;}

    public void setModelo(String modelo) {this.modelo = modelo;}

    public short getPatrimonio(){return patrimonio;}
    public void setPatrimonio(short patrimonio){this.patrimonio = patrimonio;}

    public List<Manutencao> getMaintenanceRecords() {
        return maintenanceRecords;
    }

    public void setMaintenanceRecords(List<Manutencao> maintenanceRecords) {
        this.maintenanceRecords = maintenanceRecords;
    }
}