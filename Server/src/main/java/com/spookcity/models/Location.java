package com.spookcity.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name = "locations")
public class Location {
    private String name;
    private String fileName;
    private String description;
    private Double coordinateX;
    private Double coordinateY;
    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "ghost_id")
    private Ghost ghost;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Location(String name, String fileName, String description, Double coordinateX, Double coordinateY, Ghost ghost) {
        this.name = name;
        this.fileName = fileName;
        this.description = description;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.ghost = ghost;
    }
    public Location(){}

    public String getName() {
        return name;
    }

    public String getFileName() {
        return fileName;
    }

    public String getDescription() {
        return description;
    }

    public Double getCoordinateX() {
        return coordinateX;
    }

    public Double getCoordinateY() {
        return coordinateY;
    }

    public Ghost getGhost() {
        return ghost;
    }

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCoordinateX(Double coordinateX) {
        this.coordinateX = coordinateX;
    }

    public void setCoordinateY(Double coordinateY) {
        this.coordinateY = coordinateY;
    }

    public void setGhost(Ghost ghost) {
        this.ghost = ghost;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
