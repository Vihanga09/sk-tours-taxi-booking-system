package com.sliit.taxi.taxi_booking.controller;

import com.sliit.taxi.taxi_booking.model.Driver;
import com.sliit.taxi.taxi_booking.service.TaxiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "http://localhost:3000") // Allowing React frontend access
public class DriverController {

    @Autowired
    private TaxiService taxiService;

    /**
     * Create a new driver for SK TOURS
     */
    @PostMapping("/add")
    public Driver addDriver(@RequestBody Driver driver) {
        return taxiService.saveDriver(driver);
    }

    /**
     * Fetch all registered drivers from the database
     */
    @GetMapping("/all")
    public List<Driver> getAllDrivers() {
        return taxiService.getAllDrivers();
    }

    /**
     * NEW: Fetch only available drivers for the Frontend Selection Cards
     * This connects to the custom query we added in the Repository and Service
     */
    @GetMapping("/available")
    public List<Driver> getAvailableDrivers() {
        return taxiService.getAvailableDrivers(); 
    }

    /**
     * Test endpoint for booking a ride and fare calculation logic
     */
    @GetMapping("/book")
    public String bookARide() {
        double totalFare = taxiService.calculateFare(12.0);
        return "Ride Booked Successfully! | Total Fare: LKR " + totalFare;
    }

    /**
     * Update driver details based on their ID
     */
    @PutMapping("/update/{id}")
    public Driver updateDriver(@PathVariable Long id, @RequestBody Driver driverDetails) {
        return taxiService.updateDriver(id, driverDetails);
    }

    /**
     * Remove a driver record from the SK TOURS system
     */
    @DeleteMapping("/delete/{id}")
    public String deleteDriver(@PathVariable Long id) {
        return taxiService.deleteDriver(id);
    }
}