package com.spookcity.controllers;

import com.spookcity.models.*;
import com.spookcity.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;
    @GetMapping(value = "/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/users/{id}")
    public ResponseEntity getUser(@PathVariable Long id){
        return new ResponseEntity<>(userRepository.findById(id), HttpStatus.OK);
    }
    @PostMapping("/users/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest request) {
        for (User user : userRepository.findAll()) {
            if (request.getUsername().equals(user.getUserName()) && request.getPassword().equals(user.getPassword())) {
                UserLoginResponse response = new UserLoginResponse(true, user);
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
    }


    @PostMapping("/users/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationRequest request) {
        User newUser = new User(request.getJoinUsername(), request.getProfileImage(), Rank.NOVICE, 0L, request.getJoinPassword());
        userRepository.save(newUser);
        UserLoginResponse response = new UserLoginResponse(true, newUser);
        return ResponseEntity.ok(response);
    }
}
