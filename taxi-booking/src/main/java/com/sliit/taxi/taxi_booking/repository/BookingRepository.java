package com.sliit.taxi.taxi_booking.repository;

import com.sliit.taxi.taxi_booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    // ✅ COALESCE  to handle null sums
    @Query("SELECT COALESCE(SUM(b.totalFare), 0.0) FROM Booking b WHERE b.status = 'COMPLETED'")
    Double getTotalRevenue();
}