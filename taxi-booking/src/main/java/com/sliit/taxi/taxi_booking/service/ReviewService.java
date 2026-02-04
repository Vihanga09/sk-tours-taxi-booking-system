package com.sliit.taxi.taxi_booking.service; // ✅ නිවැරදි කළා

import com.sliit.taxi.taxi_booking.model.Review; // ✅ Import එක නිවැරදි කළා
import com.sliit.taxi.taxi_booking.repository.ReviewRepository; // ✅ Import එක නිවැරදි කළා
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
    public Review updateReview(Long id, Review reviewDetails) {
    // 1. ID එකෙන් රිවීව් එක හොයනවා, නැත්නම් Error එකක් දෙනවා
    Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));

    // 2. අලුත් විස්තර ටික සෙට් කරනවා
    review.setReviewerName(reviewDetails.getReviewerName());
    review.setComment(reviewDetails.getComment());
    review.setRating(reviewDetails.getRating());

    // 3. Database එකේ සේව් කරනවා
    return reviewRepository.save(review);
}
}