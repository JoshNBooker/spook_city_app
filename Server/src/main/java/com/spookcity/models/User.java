package com.spookcity.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    private String userName;
    private int fileName;
    private Rank rank;
    private Long points;
    private String password;

    @ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
    private List<Ghost> discoveredGhosts;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public User(String userName, int fileName, Rank rank, Long points, String password) {
        this.userName = userName;
        this.fileName = fileName;
        this.rank = rank;
        this.points = points;
        this.discoveredGhosts = new ArrayList<>();
        this.password = password;
    }
    public User(){}

    public String getUserName() {
        return userName;
    }

    public int getFileName() {
        return fileName;
    }

    public Rank getRank() {
        return rank;
    }

    public Long getPoints() {
        return points;
    }

    public String getPassword() {
        return password;
    }

    public List<Ghost> getDiscoveredGhosts() {
        return discoveredGhosts;
    }

    public Long getId() {
        return id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setFileName(int fileName) {
        this.fileName = fileName;
    }

    public void setRank(Rank rank) {
        this.rank = rank;
    }

    public void setPoints(Long points) {
        this.points = points;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDiscoveredGhosts(List<Ghost> discoveredGhosts) {
        this.discoveredGhosts = discoveredGhosts;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
