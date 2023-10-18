package com.spookcity.controllers;

import com.spookcity.models.Ghost;
import com.spookcity.models.User;
import com.spookcity.repositories.GhostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GhostController {
    @Autowired
    GhostRepository ghostRepository;
    @GetMapping(value = "/ghosts")
    public ResponseEntity<List<Ghost>> getAllGhosts(){
        return new ResponseEntity<>(ghostRepository.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/ghosts/{id}")
    public ResponseEntity getGhost(@PathVariable Long id){
        return new ResponseEntity<>(ghostRepository.findById(id), HttpStatus.OK);
    }
    @PutMapping(value = "/ghosts/{id}", produces="application/json")
    public Ghost updateUsersGhosts(@PathVariable Long id, @RequestBody Ghost newGhost) {
        return ghostRepository.findById(id).map(ghost -> {
            ghost.setName(newGhost.getName());
            ghost.setFileName(newGhost.getFileName());
            ghost.setDateOfDeath(newGhost.getDateOfDeath());
            ghost.setLocation(newGhost.getLocation());
            ghost.setUsers(newGhost.getUsers());
            ghost.setDescription(newGhost.getDescription());
            ghost.setLocation(newGhost.getLocation());
            ghost.setDialogue(newGhost.getDialogue());
            ghost.setHiddenDescription(newGhost.getHiddenDescription());
            ghost.setDiscovered(newGhost.isDiscovered());
            return ghostRepository.save(ghost);
        }).orElseGet(() -> {
            System.out.println("not found");
            return null;
        });
    }
}
