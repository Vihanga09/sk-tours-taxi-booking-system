package com.sliit.taxi.taxi_booking.repository;

import com.sliit.taxi.taxi_booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}