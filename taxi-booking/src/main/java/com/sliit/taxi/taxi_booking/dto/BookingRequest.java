package com.sliit.taxi.taxi_booking.dto;

/**
 * Data Transfer Object (DTO) for handling booking requests from the frontend.
 * Updated to support passenger names for auto-registration logic.
 */
public class BookingRequest {
    private String passengerName; // Changed from Long passengerId to String for name-based booking
    private Long driverId;
    private String pickupLocation;
    private String destination;
    private Double distance;
    
    // Default Constructor
    public BookingRequest() {}
    
    // Constructor with all fields
    public BookingRequest(String passengerName, Long driverId, String pickupLocation, 
                         String destination, Double distance) {
        this.passengerName = passengerName;
        this.driverId = driverId;
        this.pickupLocation = pickupLocation;
        this.destination = destination;
        this.distance = distance;
    }
    
    // --- Getters and Setters ---

    public String getPassengerName() {
        return passengerName;
    }
    
    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }
    
    public Long getDriverId() {
        return driverId;
    }
    
    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }
    
    public String getPickupLocation() {
        return pickupLocation;
    }
    
    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }
    
    public String getDestination() {
        return destination;
    }
    
    public void setDestination(String destination) {
        this.destination = destination;
    }
    
    public Double getDistance() {
        return distance;
    }
    
    public void setDistance(Double distance) {
        this.distance = distance;
    }
    
    // toString method for debugging purposes
    @Override
    public String toString() {
        return "BookingRequest{" +
                "passengerName='" + passengerName + '\'' +
                ", driverId=" + driverId +
                ", pickupLocation='" + pickupLocation + '\'' +
                ", destination='" + destination + '\'' +
                ", distance=" + distance +
                '}';
    }
}