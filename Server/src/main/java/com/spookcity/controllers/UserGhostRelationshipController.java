package com.spookcity.controllers;

import com.spookcity.models.UserGhostRelationship;
import com.spookcity.repositories.UserGhostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserGhostRelationshipController {
        @Autowired
        private UserGhostRepository relationshipRepository;

        @PostMapping(value = "/ghost_user_relationships")
        public ResponseEntity<?> createRelationship(@RequestBody UserGhostRelationship relationship) {
            System.out.println("ghost in relationship: " + relationship.getGhost());
            return new ResponseEntity<>(relationshipRepository.save(relationship), HttpStatus.CREATED);
        }
}
