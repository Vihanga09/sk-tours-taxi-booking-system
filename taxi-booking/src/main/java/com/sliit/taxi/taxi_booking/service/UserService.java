package com.sliit.taxi.taxi_booking.service;

import com.sliit.taxi.taxi_booking.model.User;
import com.sliit.taxi.taxi_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

/**
 * UserService
 * Provides business logic for user management, including secure registration
 * and credential validation for login.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Registers a new user after verifying that the email address is unique.
     * @param user The user details provided for registration.
     * @return The saved User object.
     * @throws RuntimeException if the email is already registered in the system.
     */
    public User registerUser(User user) {
        // ✅ Check if the email is already in use to prevent duplicate accounts
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("This email address is already registered!");
        }
        return userRepository.save(user);
    }

    /**
     * Authenticates a user by checking email and password matches.
     * @param email The login email address.
     * @param password The login password.
     * @return An Optional containing the User if successful, or empty if validation fails.
     */
    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        
        // ✅ Logic: Check if user exists and verify if the stored password matches the input
        if(user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }
}