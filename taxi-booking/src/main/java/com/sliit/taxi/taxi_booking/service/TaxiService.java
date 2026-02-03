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
// ✅ Optional import එක සම්පූර්ණයෙන්ම අයින් කළා. දැන් කහ ඉරි එන්නේ නැහැ.

@Service
public class TaxiService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    public BookingRepository bookingRepository;

    // --- FARE CALCULATION ---
    public double calculateFare(double distance) {
        System.out.println("========================================");
        System.out.println("Starting Fare Calculation Strategy...");
        System.out.println("Distance received from frontend: " + distance + " km");
        double ratePerKm = 80.0;
        double totalFare = distance * ratePerKm;
        System.out.println("Calculation Logic: " + distance + " * " + ratePerKm);
        System.out.println("Final Calculated Fare: LKR " + totalFare);
        System.out.println("========================================");
        return totalFare;
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
        System.out.println("SUCCESS: Driver " + id + " has been removed from the system.");
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
        return "Passenger with ID " + id + " deleted successfully!";
    }

    // --- MAIN BOOKING LOGIC (With Auto-Passenger Registration) ---

    public Booking createBooking(BookingRequest request) {
        System.out.println("=================================================");
        System.out.println("SK TOURS - BOOKING PROCESS STARTED");
        System.out.println("=================================================");
        System.out.println("Target Passenger: " + request.getPassengerName());
        System.out.println("Target Driver ID: " + request.getDriverId());
        
        if (request.getPassengerName() == null || request.getDriverId() == null) {
            System.out.println("CRITICAL FAILURE: Missing required booking parameters.");
            throw new RuntimeException("MANDATORY FIELDS: Passenger Name and Driver ID are required!");
        }
        
        // Find existing passenger or CREATE new one automatically 
        Passenger passenger = passengerRepository.findByName(request.getPassengerName())
            .orElseGet(() -> {
                System.out.println("NEW USER DETECTED: Initializing auto-registration for " + request.getPassengerName());
                Passenger newP = new Passenger();
                newP.setName(request.getPassengerName());
                return passengerRepository.save(newP);
            });

        Driver driver = driverRepository.findById(request.getDriverId())
            .orElseThrow(() -> new RuntimeException("ERROR: The selected Driver ID does not exist in our database."));

        System.out.println("Checking availability status for driver: " + driver.getDriverName());

        if (driver.isAvailable() == null || !driver.isAvailable()) {
            System.out.println("AVAILABILITY ERROR: Driver " + driver.getDriverName() + " is already assigned to another tour.");
            throw new RuntimeException("Selected driver is currently busy!");
        }

        // Creating the final Booking entity
        Booking booking = new Booking();
        booking.setPassenger(passenger);
        booking.setDriver(driver);
        booking.setPickupLocation(request.getPickupLocation());
        booking.setDestination(request.getDestination());
        booking.setDistance(request.getDistance());
        booking.setTotalFare(calculateFare(request.getDistance())); // Using internal fare calculation logic
        booking.setBookingTime(java.time.LocalDateTime.now());
        booking.setStatus("CONFIRMED");

        // Save the booking transaction
        Booking savedBooking = bookingRepository.save(booking);
        System.out.println("SUCCESS: Booking transaction recorded with ID: " + savedBooking.getId());

        // Lock the driver for this tour
        driver.setIsAvailable(false);
        driverRepository.save(driver);
        System.out.println("STATUS UPDATE: Driver " + driver.getDriverName() + " marked as UNAVAILABLE.");
        
        System.out.println("=================================================");
        System.out.println("SK TOURS - BOOKING PROCESS COMPLETED SUCCESSFULLY");
        System.out.println("=================================================");
        return savedBooking;
    }

    public List<Booking> getAllBookings() {
        System.out.println("Action: Fetching full tour booking history report.");
        return bookingRepository.findAll();
    }

    public Booking updateBooking(Long id, BookingRequest request) {
        System.out.println("Action: Updating tour booking details for ID: " + id);
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
        
        // Logic to handle driver swap if the user changes the driver
        if (request.getDriverId() != null && !request.getDriverId().equals(booking.getDriver().getId())) {
            System.out.println("SWAP: Releasing current driver and assigning new driver.");
            Driver oldDriver = booking.getDriver();
            oldDriver.setIsAvailable(true);
            driverRepository.save(oldDriver);
            
            Driver newDriver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new RuntimeException("New driver profile missing."));
            
            if (!newDriver.isAvailable()) {
                throw new RuntimeException("New driver is currently occupied.");
            }
            
            booking.setDriver(newDriver);
            newDriver.setIsAvailable(false);
            driverRepository.save(newDriver);
            System.out.println("SWAP: Successfully changed driver for tour " + id);
        }
        
        booking.setPickupLocation(request.getPickupLocation());
        booking.setDestination(request.getDestination());
        booking.setDistance(request.getDistance());
        booking.setTotalFare(calculateFare(request.getDistance()));
        
        System.out.println("SUCCESS: Tour details updated for booking ID: " + id);
        return bookingRepository.save(booking);
    }

    public String deleteBooking(Long id) {
        System.out.println("Action: Initiating permanent deletion of booking: " + id);
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking ID not found."));
        
        // Always free the driver before deleting the booking record
        Driver driver = booking.getDriver();
        driver.setIsAvailable(true);
        driverRepository.save(driver);
        
        bookingRepository.deleteById(id);
        System.out.println("SUCCESS: Booking " + id + " removed. Guide " + driver.getDriverName() + " is free.");
        return "Booking removed successfully!";
    }

    public Booking cancelBooking(Long id) {
        System.out.println("Action: Marking booking ID " + id + " as CANCELLED.");
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus("CANCELLED");
        
        Driver driver = booking.getDriver();
        driver.setIsAvailable(true);
        driverRepository.save(driver);
        
        System.out.println("STATUS: Ride cancelled. Driver is now available.");
        return bookingRepository.save(booking);
    }

    public Booking completeBooking(Long id) {
        System.out.println("Action: Marking booking ID " + id + " as COMPLETED.");
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus("COMPLETED");
        
        Driver driver = booking.getDriver();
        driver.setIsAvailable(true);
        driverRepository.save(driver);
        
        System.out.println("STATUS: Ride completed. Total Fare received: LKR " + booking.getTotalFare());
        return bookingRepository.save(booking);
    }
}