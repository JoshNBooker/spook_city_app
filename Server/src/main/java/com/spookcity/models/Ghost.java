package com.spookcity.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "ghosts")
public class Ghost {
    private String name;
    private String fileName;
    private LocalDate dateOfDeath;
    private String dialogue;
    @JsonIgnoreProperties("ghosts")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Ghost(String name, String fileName, LocalDate dateOfDeath, String dialogue) {
        this.name = name;
        this.fileName = fileName;
        this.dateOfDeath = dateOfDeath;
        this.dialogue = dialogue;
    }
    public Ghost(){}

    public String getName() {
        return name;
    }

    public String getFileName() {
        return fileName;
    }

    public LocalDate getDateOfDeath() {
        return dateOfDeath;
    }

    public String getDialogue() {
        return dialogue;
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

    public void setDateOfDeath(LocalDate dateOfDeath) {
        this.dateOfDeath = dateOfDeath;
    }

    public void setDialogue(String dialogue) {
        this.dialogue = dialogue;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
