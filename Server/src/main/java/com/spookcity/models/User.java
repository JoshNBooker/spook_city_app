package com.spookcity.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "users")
public class User {
    private String userName;
    private String fileName;
    private Rank rank;
    private Long points;
    @JsonBackReference
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private ArrayList<Ghost> discoveredGhosts;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public User(String userName, String fileName, Rank rank, Long points, ArrayList<Ghost> discoveredGhosts) {
        this.userName = userName;
        this.fileName = fileName;
        this.rank = rank;
        this.points = points;
        this.discoveredGhosts = new ArrayList<>();
    }
    public User(){}

    public String getUserName() {
        return userName;
    }

    public String getFileName() {
        return fileName;
    }

    public Rank getRank() {
        return rank;
    }

    public Long getPoints() {
        return points;
    }

    public ArrayList<Ghost> getDiscoveredGhosts() {
        return discoveredGhosts;
    }

    public Long getId() {
        return id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setRank(Rank rank) {
        this.rank = rank;
    }

    public void setPoints(Long points) {
        this.points = points;
    }

    public void setDiscoveredGhosts(ArrayList<Ghost> discoveredGhosts) {
        this.discoveredGhosts = discoveredGhosts;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
