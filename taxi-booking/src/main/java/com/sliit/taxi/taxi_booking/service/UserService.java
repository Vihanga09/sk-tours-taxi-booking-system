package com.sliit.taxi.taxi_booking.service;

import com.sliit.taxi.taxi_booking.model.User;
import com.sliit.taxi.taxi_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

/**
 * UserService
 * Provides business logic for user management and email notifications.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService; // ✅ EmailService එක Inject කළා

    /**
     * Registers a new user and sends a welcome email.
     */
    public User registerUser(User user) {
        // ✅ Check if the email is already in use
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("This email address is already registered!");
        }

        // ✅ Save user to Database
        User savedUser = userRepository.save(user);

        // ✅ Send Welcome Email
        String subject = "Welcome to SK TOURS! 🚕";
        String body = "Ayubowan " + savedUser.getName() + ",\n\n" +
                      "Thank you for registering with SK TOURS. We are excited to have you on board!\n" +
                      "You can now book your taxis and manage your journeys easily.\n\n" +
                      "Best Regards,\nSK TOURS Management";

        try {
            emailService.sendEmail(savedUser.getEmail(), subject, body);
        } catch (Exception e) {
            //email sending failed, log the error
            System.out.println("--- DEBUG ERROR: Email sending failed: " + e.getMessage());
        }

        return savedUser;
    }

    /**
     * Authenticates a user.
     */
    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        
        if(user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }
}