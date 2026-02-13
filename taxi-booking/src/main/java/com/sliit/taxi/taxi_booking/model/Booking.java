package com.sliit.taxi.taxi_booking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime; // 

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "passenger_id", nullable = false)
    private Passenger passenger;
    
    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driver;
    
    private String pickupLocation;
    private String destination;
    private Double distance;
    private Double totalFare; 
    private LocalDateTime bookingTime;
    private String status; // "PENDING", "CONFIRMED", "COMPLETED"
    private String passengerEmail;
    
    public Booking() {}
    
    public Booking(Passenger passenger, Driver driver, String pickupLocation, 
                   String destination, Double distance) {
        this.passenger = passenger;
        this.driver = driver;
        this.pickupLocation = pickupLocation;
        this.destination = destination;
        this.distance = distance;
        this.status = "PENDING";
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Passenger getPassenger() { return passenger; }
    public void setPassenger(Passenger passenger) { this.passenger = passenger; }
    
    public Driver getDriver() { return driver; }
    public void setDriver(Driver driver) { this.driver = driver; }
    
    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }
    
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    
    public Double getDistance() { return distance; }
    public void setDistance(Double distance) { this.distance = distance; }
    
    // ✅ මේ methods දෙක add කරන්න
    public Double getTotalFare() { return totalFare; }
    public void setTotalFare(Double totalFare) { this.totalFare = totalFare; }
    
    public LocalDateTime getBookingTime() { return bookingTime; }
    public void setBookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPassengerEmail() { return passengerEmail; }
    public void setPassengerEmail(String passengerEmail) { this.passengerEmail = passengerEmail; }

}