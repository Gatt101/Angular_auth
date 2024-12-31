package com.gatt11.SpringSec.controller;

import com.gatt11.SpringSec.model.User;
import com.gatt11.SpringSec.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.register(user);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public String login(@RequestBody User user)
    {
        return userService.verify(user);
    }



}
