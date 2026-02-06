package com.sliit.taxi.taxi_booking.controller;

import com.sliit.taxi.taxi_booking.model.Review;
import com.sliit.taxi.taxi_booking.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * ReviewController
 * Acts as the entry point for all review-related REST API requests.
 * Orchestrates CRUD operations by communicating with the ReviewService.
 */
@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*") // Enables Cross-Origin Resource Sharing for React frontend
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    /**
     * Fetches the complete list of customer reviews.
     * @return List of Review entities.
     */
    @GetMapping("/all")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    /**
     * Creates a new review entry. 
     * Expects a JSON object including 'reviewerName', 'comment', 'rating', and 'userEmail'.
     * @param review Data received from the frontend.
     * @return The saved Review object.
     */
    @PostMapping("/create")
    public Review createReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    /**
     * Removes a specific review based on the provided ID.
     * @param id Unique identifier for the review.
     * @return Success message string.
     */
    @DeleteMapping("/delete/{id}")
    public String deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return "SUCCESS: Review with ID " + id + " has been deleted.";
    }

    /**
     * Modifies an existing review.
     * Triggered when a customer edits their previous feedback.
     * @param id The ID of the review to be updated.
     * @param review The updated data payload.
     * @return The updated Review object.
     */
    @PutMapping("/update/{id}") 
    public Review updateReview(@PathVariable Long id, @RequestBody Review review) {
        return reviewService.updateReview(id, review);
    }
}