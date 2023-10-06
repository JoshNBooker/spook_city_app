package com.spookcity.controllers;

import com.spookcity.models.Ghost;
import com.spookcity.repositories.GhostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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
}
