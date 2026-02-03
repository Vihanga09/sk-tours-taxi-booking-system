package com.sliit.taxi.taxi_booking.model;

import jakarta.persistence.*;

@Entity
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String country; // passenger country
    private String phoneNumber;

    public Passenger() {}

    public Passenger(String name, String email, String country, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.country = country;
        this.phoneNumber = phoneNumber;
    }

    // Getters and Setters ට
    public Long getId() 
        { return id; }
    public void setId(Long id) 
        { this.id = id; }
    public String getName() 
        { return name; }
    public void setName(String name) 
        { this.name = name; }
    public String getEmail() 
        { return email; }
    public void setEmail(String email) 
        { this.email = email; }
    public String getCountry() 
        { return country; }
    public void setCountry(String country) 
        { this.country = country; }
    public String getPhoneNumber() 
        { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) 
        { this.phoneNumber = phoneNumber; }
}