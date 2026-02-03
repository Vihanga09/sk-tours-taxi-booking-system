package com.sliit.taxi.taxi_booking.repository;

import com.sliit.taxi.taxi_booking.model.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; // ✅ මේක තමයි වැදගත්ම දේ

@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long> {
    // Custom method to find passenger by name
    Optional<Passenger> findByName(String name); 
}