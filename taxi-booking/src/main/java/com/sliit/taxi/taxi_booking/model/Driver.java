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
    private String vehicleType;
    private Boolean isAvailable; // ✅ boolean එක Boolean එකට change කරන්න
    
    public Driver() {}
    
    public Driver(String driverName, String vehicleType, Boolean isAvailable) { // ✅ මෙතනත් Boolean
        this.driverName = driverName;
        this.vehicleType = vehicleType;
        this.isAvailable = isAvailable;
    }
    
    // Getters and Setters 
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }
    
    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }
    
    public Boolean isAvailable() { return isAvailable; } // ✅ Boolean
    public void setIsAvailable(Boolean isAvailable) { // ✅ Boolean
        this.isAvailable = isAvailable; 
    }
}