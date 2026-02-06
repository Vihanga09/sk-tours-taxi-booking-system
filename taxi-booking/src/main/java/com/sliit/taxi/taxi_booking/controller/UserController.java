package com.sliit.taxi.taxi_booking.controller;

import com.sliit.taxi.taxi_booking.model.User;
import com.sliit.taxi.taxi_booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * UserController
 * Orchestrates user-related operations such as secure registration and authentication.
 * Implements a "Secret Key" validation mechanism to restrict unauthorized Admin creation.
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") 
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ Master Secret Key: Required for anyone attempting to register as an ADMIN.
    private static final String ADMIN_SECRET_KEY = "Kanchucka@2002";

    /**
     * Registration Endpoint
     * Handles both Customer and Admin sign-ups. 
     * Validates the provided 'adminKey' if the requested role is 'ADMIN'.
     * @param user User details provided via the frontend registration form.
     * @return Success response with User data or an error message on validation failure.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // ✅ Ownership/Role Validation:
            // If the user selects the ADMIN role, they must provide the correct master key.
            if ("ADMIN".equalsIgnoreCase(user.getRole())) {
                if (user.getAdminKey() == null || !user.getAdminKey().equals(ADMIN_SECRET_KEY)) {
                    // Returns 403 Forbidden if the key is missing or incorrect.
                    return ResponseEntity.status(403).body("Access Denied: Invalid Admin Secret Key provided.");
                }
            }

            // If it's a Customer or a valid Admin, proceed with registration.
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            // Handles duplicate emails or other service-level errors.
            return ResponseEntity.badRequest().body("Registration Failed: " + e.getMessage());
        }
    }

    /**
     * Login Endpoint
     * Verifies user credentials (Email and Password) against the database.
     * @param loginRequest User credentials sent from the login form.
     * @return User object on success, or 401 Unauthorized status on failure.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        
        if(user.isPresent()) {
            // Login successful: Return the user object (usually stored in LocalStorage on frontend).
            return ResponseEntity.ok(user.get());
        }
        
        // Login failed: Return 401 Unauthorized.
        return ResponseEntity.status(401).body("Access Denied: Invalid email or password!");
    }
}