package com.sliit.taxi.taxi_booking.repository;

import com.sliit.taxi.taxi_booking.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    // Custom query to fetch drivers whose isAvailable status is true
    List<Driver> findByIsAvailable(boolean isAvailable);
}