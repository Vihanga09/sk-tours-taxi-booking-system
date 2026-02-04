package com.sliit.taxi.taxi_booking.controller; // ✅ නිවැරදි කළා

import com.sliit.taxi.taxi_booking.model.Review; // ✅ Import එක නිවැරදි කළා
import com.sliit.taxi.taxi_booking.service.ReviewService; // ✅ Import එක නිවැරදි කළා
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*") // දැනට ඔක්කොටම ඉඩ දෙමු
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/all")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @PostMapping("/create")
    public Review createReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    
    @DeleteMapping("/delete/{id}")
    public String deleteReview(@PathVariable Long id) {
    reviewService.deleteReview(id);
    return "Review deleted successfully with ID: " + id; // ✅ දැන් මේ මැසේජ් එක පෝස්ට්මන් එකේ පේනවා
    }

    @PutMapping("/update/{id}") 
    public Review updateReview(@PathVariable Long id, @RequestBody Review review) {
    return reviewService.updateReview(id, review);
    }
}