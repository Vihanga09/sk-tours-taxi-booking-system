package com.sliit.taxi.taxi_booking.controller;

import com.sliit.taxi.taxi_booking.model.Passenger;
import com.sliit.taxi.taxi_booking.service.TaxiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passengers")
public class PassengerController {

    @Autowired
    private TaxiService taxiService;

    //create passenger
    @PostMapping("/add")
    public Passenger addPassenger(@RequestBody Passenger passenger) {
        return taxiService.savePassenger(passenger);
    }

    //get all passengers
    @GetMapping("/all")
    public List<Passenger> getAllPassengers() {
        return taxiService.getAllPassengers();
    }

    //update passenger
    @PutMapping("/update/{id}")
    public Passenger updatePassenger(@PathVariable Long id, @RequestBody Passenger passengerDetails) {
        return taxiService.updatePassenger(id, passengerDetails);
    }

    //delete passenger  
    @DeleteMapping("/delete/{id}")
    public String deletePassenger(@PathVariable Long id) {
         return taxiService.deletePassenger(id);
    }
}