package com.sliit.taxi.taxi_booking.controller;

import com.sliit.taxi.taxi_booking.dto.BookingRequest;
import com.sliit.taxi.taxi_booking.model.Booking;
import com.sliit.taxi.taxi_booking.service.TaxiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")

public class BookingController {
    
    @Autowired
    private TaxiService taxiService;
    
    // CREATE - Booking එකක් හදන්න
    @PostMapping("/create")
    public Booking bookRide(@RequestBody BookingRequest request) {
        return taxiService.createBooking(request);
    }
    
    // READ - හැම booking එකම ගන්න
    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return taxiService.getAllBookings();
    }
    
    // READ - එක booking එකක් ID එකෙන් ගන්න
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return taxiService.bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
    }
    
    // UPDATE - Booking එකක් update කරන්න
    @PutMapping("/update/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody BookingRequest request) {
        return taxiService.updateBooking(id, request);
    }
    
    // DELETE - Booking එකක් delete කරන්න
    @DeleteMapping("/delete/{id}")
    public String deleteBooking(@PathVariable Long id) {
        return taxiService.deleteBooking(id);
    }
    
    // CANCEL - Booking එකක් cancel කරන්න (delete නොකර)
    @PutMapping("/cancel/{id}")
    public Booking cancelBooking(@PathVariable Long id) {
        return taxiService.cancelBooking(id);
    }
    
    // COMPLETE - Booking එකක් complete කරන්න
    @PutMapping("/complete/{id}")
    public Booking completeBooking(@PathVariable Long id) {
        return taxiService.completeBooking(id);
    }
}