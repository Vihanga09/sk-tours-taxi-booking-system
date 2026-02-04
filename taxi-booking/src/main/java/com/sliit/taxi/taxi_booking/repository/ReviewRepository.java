package com.sliit.taxi.taxi_booking.repository; // ✅ නිවැරදි කළා

import com.sliit.taxi.taxi_booking.model.Review; // ✅ Import එක නිවැරදි කළා
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}