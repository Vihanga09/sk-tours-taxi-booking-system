package com.sliit.taxi.taxi_booking.model;

import jakarta.persistence.*;

/**
 * User Entity Model
 * Represents the 'users' table in the database.
 * Supports Role-Based Access Control (RBAC) and Admin registration validation.
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // Stores "CUSTOMER" or "ADMIN"

    /**
     * ✅ Admin Secret Key (Transient)
     * This field is NOT persisted in the database.
     * It is only used for temporary validation during Admin registration.
     */
    @Transient
    private String adminKey;

    // --- Constructors ---

    public User() {
    }

    public User(String name, String email, String password, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // --- Getters and Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    // ✅ Crucial for UserController to access the secret key during signup
    public String getAdminKey() { return adminKey; }
    public void setAdminKey(String adminKey) { this.adminKey = adminKey; }
}