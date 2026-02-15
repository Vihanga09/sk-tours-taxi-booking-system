package com.sliit.taxi.taxi_booking.controller;

import com.sliit.taxi.taxi_booking.dto.BookingRequest;
import com.sliit.taxi.taxi_booking.model.Booking;
import com.sliit.taxi.taxi_booking.service.TaxiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@SuppressWarnings("null")
@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    
    @Autowired
    private TaxiService taxiService;
    
    // Create a new booking
    @PostMapping("/create")
    public Booking bookRide(@RequestBody BookingRequest request) {
        return taxiService.createBooking(request);
    }
    
    // Fetch all bookings from the database
    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return taxiService.getAllBookings();
    }
    
    // NEW: Get Total Revenue for the Admin Dashboard
    @GetMapping("/revenue")
    public double getTotalRevenue() {
        // This calls the sum query from our repository via service
        return taxiService.getTotalRevenue();
    }
    
    // Fetch a single booking record by its ID
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return taxiService.bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
    }
    
    // Update existing booking details (pickup, destination, etc.)
    @PutMapping("/update/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody BookingRequest request) {
        return taxiService.updateBooking(id, request);
    }
    
    // Permanently remove a booking from the system
    @DeleteMapping("/delete/{id}")
    public String deleteBooking(@PathVariable Long id) {
        return taxiService.deleteBooking(id);
    }
    
    // Mark a booking as CANCELLED and free the driver
    @PutMapping("/cancel/{id}")
    public Booking cancelBooking(@PathVariable Long id) {
        return taxiService.cancelBooking(id);
    }
    
    // Mark a booking as COMPLETED and add the fare to total revenue
    @PutMapping("/complete/{id}")
    public Booking completeBooking(@PathVariable Long id) {
        return taxiService.completeBooking(id);
    }
}