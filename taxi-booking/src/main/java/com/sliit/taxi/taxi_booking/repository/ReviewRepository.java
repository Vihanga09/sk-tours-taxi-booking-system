package com.sliit.taxi.taxi_booking.repository;

import com.sliit.taxi.taxi_booking.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ReviewRepository
 * Data Access Object (DAO) for the Review entity.
 * Provides standard CRUD operations to interact with the 'reviews' database table.
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // JpaRepository provides implementation for findById, findAll, save, and deleteById.
}