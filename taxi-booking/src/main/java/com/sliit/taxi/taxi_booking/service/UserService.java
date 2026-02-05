package com.sliit.taxi.taxi_booking.service;

import com.sliit.taxi.taxi_booking.model.User;
import com.sliit.taxi.taxi_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Check the email is already used during registration
    public User registerUser(User user) {
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email එක දැනටමත් පාවිච්චි කරලා තියෙන්නේ!");
        }
        return userRepository.save(user);
    }

    // Login time email and password verify 
    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }
}