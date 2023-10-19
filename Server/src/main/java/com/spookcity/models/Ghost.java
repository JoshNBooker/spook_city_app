package com.spookcity.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.awt.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ghosts")
public class Ghost {
    private String name;
    private String fileName;
    private String hiddenDescription;
    private String description;
    private LocalDate dateOfDeath;
    private String dialogue;
    private boolean discovered;
    @Lob
    private String bio;


    @JsonIgnoreProperties("ghost")
    @OneToOne(mappedBy = "ghost", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Location location;

//    @JsonIgnoreProperties({"discoveredGhosts"})
    @JsonBackReference("ghost-users")
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "user_ghost_relationships",
            joinColumns = {@JoinColumn(name = "ghost_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="user_id", nullable = false, updatable = false)}
    )
    private List<User> users;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Ghost(String name, String fileName, String hiddenDescription, String description, LocalDate dateOfDeath, String dialogue, boolean discovered, String bio) {
        this.name = name;
        this.fileName = fileName;
        this.hiddenDescription = hiddenDescription;
        this.description = description;
        this.dateOfDeath = dateOfDeath;
        this.dialogue = dialogue;
        this.discovered = discovered;
        this.bio = bio;
        this.location = location;
        this.users = new ArrayList<>();
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
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

    public List<User> getUsers() {
        return users;
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

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHiddenDescription() {
        return hiddenDescription;
    }

    public String getDescription() {
        return description;
    }

    public void setHiddenDescription(String hiddenDescription) {
        this.hiddenDescription = hiddenDescription;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isDiscovered() {
        return discovered;
    }

    public void setDiscovered(boolean discovered) {
        this.discovered = discovered;
    }


    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
