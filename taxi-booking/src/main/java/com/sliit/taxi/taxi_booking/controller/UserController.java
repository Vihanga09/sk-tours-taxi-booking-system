package com.sliit.taxi.taxi_booking.controller;

import com.sliit.taxi.taxi_booking.model.User;
import com.sliit.taxi.taxi_booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // ඔයා Vite නෙවෙයි 3000 පාවිච්චි කරන නිසා මේක දැම්මා
public class UserController {

    @Autowired
    private UserService userService;

    // 📝 Registration API - අලුතින් Account එකක් හදන්න
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 🔑 Login API - Username/Password check
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        
        if(user.isPresent()) {
            // Login is successful
            return ResponseEntity.ok(user.get());
        }
        
        // Login is unsuccessful
        return ResponseEntity.status(401).body("Invalid email or password!");
    }
}