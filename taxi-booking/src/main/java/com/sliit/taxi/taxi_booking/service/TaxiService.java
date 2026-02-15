package com.sliit.taxi.taxi_booking.service;

import com.sliit.taxi.taxi_booking.dto.BookingRequest;
import com.sliit.taxi.taxi_booking.model.Booking;
import com.sliit.taxi.taxi_booking.model.Driver;
import com.sliit.taxi.taxi_booking.model.Passenger;
import com.sliit.taxi.taxi_booking.repository.BookingRepository;
import com.sliit.taxi.taxi_booking.repository.DriverRepository;
import com.sliit.taxi.taxi_booking.repository.PassengerRepository; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List; 

/**
 * TaxiService handles the core business logic for SK TOURS.
 * Includes Fare Calculation, Revenue Tracking, Driver/Passenger Management, and Booking Notifications.
 */
@SuppressWarnings("null")
@Service
public class TaxiService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    public BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService; // ✅ Injecting the Email Service for tour confirmations

    // --- FARE CALCULATION ---
    public double calculateFare(double distance) {
        System.out.println("========================================");
        System.out.println("Starting Fare Calculation Strategy...");
        System.out.println("Distance received from frontend: " + distance + " km");
        double ratePerKm = 100.0;
        double totalFare = distance * ratePerKm;
        System.out.println("Calculation Logic: " + distance + " * " + ratePerKm);
        System.out.println("Final Calculated Fare: LKR " + totalFare);
        System.out.println("========================================");
        return totalFare;
    }
    
    // ✅ NEW & SAFE: Revenue method using Java Streams to avoid null issues
    public double getTotalRevenue() {
        List<Booking> allBookings = bookingRepository.findAll();
        double revenue = allBookings.stream()
                .filter(b -> "COMPLETED".equals(b.getStatus()))
                .mapToDouble(b -> b.getTotalFare() != null ? b.getTotalFare() : 0.0)
                .sum();
        
        System.out.println("Total System Revenue Calculated: LKR " + revenue);
        return revenue;
    }
    
    // --- DRIVER LOGIC (CRUD & AVAILABILITY) ---

    public Driver saveDriver(Driver driver) {
        System.out.println("Action: Saving new driver profile to database.");
        System.out.println("Driver Name: " + driver.getDriverName());
        return driverRepository.save(driver);
    }
    
    public List<Driver> getAllDrivers() {
        System.out.println("Action: Requesting all registered drivers list.");
        return driverRepository.findAll();
    }

    public List<Driver> getAvailableDrivers() {
        System.out.println("Action: Filtering available drivers (isAvailable = true).");
        return driverRepository.findByIsAvailable(true);
    }
    
    public Driver updateDriver(Long id, Driver driverDetails) {
        System.out.println("Action: Updating driver profile for ID: " + id);
        Driver driver = driverRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("CRITICAL ERROR: Driver not found with id: " + id));
        
        driver.setDriverName(driverDetails.getDriverName());
        driver.setVehicleType(driverDetails.getVehicleType());
        driver.setVehicleModel(driverDetails.getVehicleModel()); // ✅ Added Vehicle Model
        driver.setIsAvailable(driverDetails.isAvailable());
        
        System.out.println("SUCCESS: Driver data updated for " + driver.getDriverName());
        return driverRepository.save(driver);
    }
    
    public String deleteDriver(Long id) {
        System.out.println("Action: Attempting to remove driver with ID: " + id);
        if(!driverRepository.existsById(id)) {
            throw new RuntimeException("ERROR: Could not find driver to delete.");
        }
        driverRepository.deleteById(id);
        System.out.println("SUCCESS: Driver " + id + " has been removed.");
        return "Driver with ID " + id + " deleted successfully!";
    }

    // --- PASSENGER LOGIC (CRUD) ---

    public Passenger savePassenger(Passenger passenger) {
        System.out.println("Action: Creating a new passenger entry.");
        return passengerRepository.save(passenger);
    }

    public List<Passenger> getAllPassengers() {
        System.out.println("Action: Fetching all passengers data.");
        return passengerRepository.findAll();
    }
    
    public Passenger updatePassenger(Long id, Passenger passengerDetails) {
        System.out.println("Action: Updating passenger profile for ID: " + id);
        Passenger passenger = passengerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Passenger record not found for id: " + id));

        passenger.setName(passengerDetails.getName());
        passenger.setEmail(passengerDetails.getEmail());
        passenger.setCountry(passengerDetails.getCountry());
        passenger.setPhoneNumber(passengerDetails.getPhoneNumber());

        System.out.println("SUCCESS: Passenger " + passenger.getName() + " updated.");
        return passengerRepository.save(passenger);
    }
    
    public String deletePassenger(Long id) {
        System.out.println("Action: Request to delete passenger ID: " + id);
        if(!passengerRepository.existsById(id)) {
            throw new RuntimeException("Passenger record missing for id: " + id);
        }
        passengerRepository.deleteById(id);
        return "Passenger deleted successfully!";
    }

    // --- MAIN BOOKING LOGIC ---

    public Booking createBooking(BookingRequest request) {
        System.out.println("=================================================");
        System.out.println("SK TOURS - BOOKING PROCESS STARTED");
        System.out.println("=================================================");
        
        if (request.getPassengerName() == null || request.getDriverId() == null) {
            throw new RuntimeException("MANDATORY FIELDS: Passenger Name and Driver ID are required!");
        }
        
        // Find existing or create new passenger
        Passenger passenger = passengerRepository.findByName(request.getPassengerName())
            .orElseGet(() -> {
                System.out.println("NEW USER DETECTED: Auto-registration for " + request.getPassengerName());
                Passenger newP = new Passenger();
                newP.setName(request.getPassengerName());
                newP.setEmail(request.getPassengerEmail());
                
                
                newP.setCountry(request.getCountry());
                newP.setPhoneNumber(request.getPhoneNumber());
                
                return passengerRepository.save(newP);
            });

        // If passenger already exists, update their email, country, and phone number if provided
        if (request.getCountry() != null) passenger.setCountry(request.getCountry());
        if (request.getPhoneNumber() != null) passenger.setPhoneNumber(request.getPhoneNumber());
        passengerRepository.save(passenger);

        Driver driver = driverRepository.findById(request.getDriverId())
            .orElseThrow(() -> new RuntimeException("ERROR: Driver ID does not exist."));

        if (driver.isAvailable() == null || !driver.isAvailable()) {
            System.out.println("AVAILABILITY ERROR: Driver " + driver.getDriverName() + " is busy.");
            throw new RuntimeException("Selected driver is currently busy!");
        }

        Booking booking = new Booking();
        booking.setPassenger(passenger);
        booking.setDriver(driver);
        booking.setPickupLocation(request.getPickupLocation());
        booking.setDestination(request.getDestination());
        booking.setDistance(request.getDistance());
        booking.setPassengerEmail(request.getPassengerEmail()); // ✅ Setting email for notifications
        booking.setTotalFare(calculateFare(request.getDistance()));
        booking.setBookingTime(java.time.LocalDateTime.now());
        booking.setStatus("CONFIRMED");

        Booking savedBooking = bookingRepository.save(booking);

        // ✅ FIXED: Confirmation Email details with new fields
        try {
            String subject = "SK TOURS - Booking Confirmation ✅";
            String body = "Ayubowan " + savedBooking.getPassenger().getName() + ",\n\n" +
                          "Your taxi booking is successful!\n" +
                          "----------------------------------\n" +
                          "Pickup: " + savedBooking.getPickupLocation() + "\n" +
                          "Destination: " + savedBooking.getDestination() + "\n" +
                          "Fare: LKR " + savedBooking.getTotalFare() + "\n" +
                          "Country: " + (savedBooking.getPassenger().getCountry() != null ? savedBooking.getPassenger().getCountry() : "N/A") + "\n" +
                          "Phone: " + (savedBooking.getPassenger().getPhoneNumber() != null ? savedBooking.getPassenger().getPhoneNumber() : "N/A") + "\n" +
                          "----------------------------------\n" +
                          "Thank you for choosing SK TOURS!";

            emailService.sendEmail(
                savedBooking.getPassengerEmail(), 
                subject, 
                body
            );
            System.out.println("EMAIL SUCCESS: Confirmation sent to " + savedBooking.getPassengerEmail());
        } catch (Exception e) {
            System.err.println("EMAIL ERROR: Notification failed: " + e.getMessage());
        }

        driver.setIsAvailable(false);
        driverRepository.save(driver);
        
        System.out.println("SUCCESS: Booking ID: " + savedBooking.getId());
        return savedBooking;
    }

    public List<Booking> getAllBookings() {
        System.out.println("Action: Fetching full tour booking history.");
        return bookingRepository.findAll();
    }

    public Booking updateBooking(Long id, BookingRequest request) {
        System.out.println("Action: Updating tour booking details for ID: " + id);
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
        
        if (request.getDriverId() != null && !request.getDriverId().equals(booking.getDriver().getId())) {
            Driver oldDriver = booking.getDriver();
            oldDriver.setIsAvailable(true);
            driverRepository.save(oldDriver);
            
            Driver newDriver = driverRepository.findById(request.getDriverId()).orElseThrow();
            if (!newDriver.isAvailable()) {
                throw new RuntimeException("New driver is currently occupied.");
            }
            booking.setDriver(newDriver);
            newDriver.setIsAvailable(false);
            driverRepository.save(newDriver);
        }
        
        booking.setPickupLocation(request.getPickupLocation());
        booking.setDestination(request.getDestination());
        booking.setDistance(request.getDistance());
        booking.setTotalFare(calculateFare(request.getDistance()));
        
        return bookingRepository.save(booking);
    }

    public String deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        Driver driver = booking.getDriver();
        driver.setIsAvailable(true);
        driverRepository.save(driver);
        bookingRepository.deleteById(id);
        return "Booking removed successfully!";
    }

    public Booking cancelBooking(Long id) {
        System.out.println("Action: Marking booking ID " + id + " as CANCELLED.");
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus("CANCELLED");
        
        Driver driver = booking.getDriver();
        driver.setIsAvailable(true);
        driverRepository.save(driver);
        
        return bookingRepository.save(booking);
    }

    public Booking completeBooking(Long id) {
        System.out.println("Action: Marking booking ID " + id + " as COMPLETED.");
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus("COMPLETED");
        
        Driver driver = booking.getDriver();
        driver.setIsAvailable(true);
        driverRepository.save(driver);
        
        System.out.println("SUCCESS: Ride completed. Fare LKR " + booking.getTotalFare() + " confirmed.");
        return bookingRepository.save(booking);
    }
}