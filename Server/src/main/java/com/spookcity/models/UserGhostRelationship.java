package com.spookcity.models;

import javax.persistence.*;

@Entity
@Table(name = "user_ghost_relationships")
public class UserGhostRelationship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "ghost_id")
    private Ghost ghost;

    public UserGhostRelationship(User user, Ghost ghost) {
        this.user = user;
        this.ghost = ghost;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setGhost(Ghost ghost) {
        this.ghost = ghost;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Ghost getGhost() {
        return ghost;
    }
}

