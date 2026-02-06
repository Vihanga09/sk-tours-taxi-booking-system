package com.sliit.taxi.taxi_booking.service;

import com.sliit.taxi.taxi_booking.model.Review;
import com.sliit.taxi.taxi_booking.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * ReviewService
 * Provides business logic for managing customer reviews.
 * Communicates directly with the ReviewRepository for database operations.
 */
@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * Retrieves all reviews from the database.
     * @return List of all submitted customer reviews.
     */
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    /**
     * Persists a new review in the database.
     * @param review The review entity to save.
     * @return The saved review object.
     */
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    /**
     * Removes a specific review from the database based on its ID.
     * @param id The unique identifier of the review.
     */
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    /**
     * Updates an existing review's details.
     * @param id The ID of the review to be updated.
     * @param reviewDetails The new data to replace the old review content.
     * @return The updated and saved review object.
     */
    public Review updateReview(Long id, Review reviewDetails) {
        // Find the existing review or throw an error if not found
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));

        // Update the fields with the new data from the request
        review.setReviewerName(reviewDetails.getReviewerName());
        
        // ✅ NEW: Persisting the owner's email during an update
        review.setUserEmail(reviewDetails.getUserEmail()); 
        
        review.setComment(reviewDetails.getComment());
        review.setRating(reviewDetails.getRating());

        // Save the updated entity back to the database
        return reviewRepository.save(review);
    }
}