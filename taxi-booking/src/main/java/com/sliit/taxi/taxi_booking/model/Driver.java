package com.sliit.taxi.taxi_booking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    
    private String driverName;
    private String vehicleType;  // Category: Car, Van, Tuk Tuk
    private String vehicleModel; // Specific Model: Vezel Z 2025, Aqua, etc.
    private Boolean isAvailable; 
    
    public Driver() {}
    
    public Driver(String driverName, String vehicleType, String vehicleModel, Boolean isAvailable) {
        this.driverName = driverName;
        this.vehicleType = vehicleType;
        this.vehicleModel = vehicleModel;
        this.isAvailable = isAvailable;
    }
    
    // Getters and Setters 
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }
    
    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public String getVehicleModel() { return vehicleModel; }
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }
    
    public Boolean isAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { 
        this.isAvailable = isAvailable; 
    }
}