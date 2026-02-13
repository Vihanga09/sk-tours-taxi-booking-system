package com.sliit.taxi.taxi_booking.dto;

/**
 * Data Transfer Object (DTO) for handling booking requests from the frontend.
 * Updated to support passenger names for auto-registration logic and email for notifications.
 */
public class BookingRequest {
    private String passengerName; 
    private String passengerEmail; // ✅ NEW: Required for sending booking confirmation emails
    private Long driverId;
    private String pickupLocation;
    private String destination;
    private Double distance;
    
    // Default Constructor
    public BookingRequest() {}
    
    // Constructor with all fields
    public BookingRequest(String passengerName, String passengerEmail, Long driverId, String pickupLocation, 
                         String destination, Double distance) {
        this.passengerName = passengerName;
        this.passengerEmail = passengerEmail; // ✅ Added
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

    // ✅ NEW: Getter and Setter for passengerEmail
    public String getPassengerEmail() {
        return passengerEmail;
    }

    public void setPassengerEmail(String passengerEmail) {
        this.passengerEmail = passengerEmail;
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
                ", passengerEmail='" + passengerEmail + '\'' + // ✅ Added to toString
                ", driverId=" + driverId +
                ", pickupLocation='" + pickupLocation + '\'' +
                ", destination='" + destination + '\'' +
                ", distance=" + distance +
                '}';
    }
}