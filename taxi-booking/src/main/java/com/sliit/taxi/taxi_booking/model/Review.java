package com.sliit.taxi.taxi_booking.model;

import jakarta.persistence.*;

/**
 * Review Entity Model
 * Represents the 'reviews' table in the database.
 * Used to store customer feedback and ratings for the taxi service.
 */
@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reviewerName; // The display name of the customer
    
    // ✅ NEW FIELD: To identify the owner of the review for security/edit permissions
    private String userEmail; 
    
    @Column(columnDefinition = "TEXT")
    private String comment; // Detailed customer feedback
    
    private int rating; // Numeric rating (e.g., 1 to 5 stars)

    // --- Getters and Setters (Essential for Spring Boot Data Binding) ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getReviewerName() { return reviewerName; }
    public void setReviewerName(String reviewerName) { this.reviewerName = reviewerName; }

    // ✅ Getter and Setter for the new userEmail field
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
}