package com.sliit.taxi.taxi_booking.dto;

/**
 * Data Transfer Object (DTO) updated with Country and Phone Number fields.
 */
public class BookingRequest {
    private String passengerName; 
    private String passengerEmail; 
    private String country;       // ✅ NEW
    private String phoneNumber;   // ✅ NEW
    private Long driverId;
    private String pickupLocation;
    private String destination;
    private Double distance;
    
    // Default Constructor
    public BookingRequest() {}
    
    // Constructor with all fields
    public BookingRequest(String passengerName, String passengerEmail, String country, String phoneNumber, 
                          Long driverId, String pickupLocation, String destination, Double distance) {
        this.passengerName = passengerName;
        this.passengerEmail = passengerEmail;
        this.country = country;           // ✅ Added
        this.phoneNumber = phoneNumber;   // ✅ Added
        this.driverId = driverId;
        this.pickupLocation = pickupLocation;
        this.destination = destination;
        this.distance = distance;
    }
    
    // --- Getters and Setters ---

    public String getPassengerName() { return passengerName; }
    public void setPassengerName(String passengerName) { this.passengerName = passengerName; }

    public String getPassengerEmail() { return passengerEmail; }
    public void setPassengerEmail(String passengerEmail) { this.passengerEmail = passengerEmail; }

    // ✅ NEW: Getter and Setter for country
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    // ✅ NEW: Getter and Setter for phoneNumber
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public Long getDriverId() { return driverId; }
    public void setDriverId(Long driverId) { this.driverId = driverId; }
    
    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }
    
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    
    public Double getDistance() { return distance; }
    public void setDistance(Double distance) { this.distance = distance; }
    
    @Override
    public String toString() {
        return "BookingRequest{" +
                "passengerName='" + passengerName + '\'' +
                ", passengerEmail='" + passengerEmail + '\'' +
                ", country='" + country + '\'' +      // ✅ Added
                ", phoneNumber='" + phoneNumber + '\'' + // ✅ Added
                ", driverId=" + driverId +
                ", pickupLocation='" + pickupLocation + '\'' +
                ", destination='" + destination + '\'' +
                ", distance=" + distance +
                '}';
    }
}