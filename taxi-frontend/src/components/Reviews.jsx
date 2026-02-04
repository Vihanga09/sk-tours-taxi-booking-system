import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ reviewerName: '', comment: '', rating: 5 });

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/reviews/all');
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/reviews/create', newReview);
      Swal.fire('Success', 'Review added to Database!', 'success');
      setNewReview({ reviewerName: '', comment: '', rating: 5 });
      fetchReviews(); 
    } catch (error) {
      Swal.fire('Error', 'Could not save review', 'error');
    }
  };

  const deleteReview = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the review!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/reviews/delete/${id}`);
        Swal.fire('Deleted!', 'Review removed from DB.', 'success');
        fetchReviews();
      } catch (error) {
        Swal.fire('Error', 'Could not delete review', 'error');
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Customer Experience ⭐</h1>
      
      <div style={{...infoCard, marginBottom: '30px'}}>
        <h3 style={cardHeadingStyle}>Add a Review (Admin Panel)</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Reviewer Name" 
            style={inputFix} 
            value={newReview.reviewerName}
            onChange={(e) => setNewReview({...newReview, reviewerName: e.target.value})}
            required
          />
          <textarea 
            placeholder="Review Comment" 
            style={{...inputFix, height: '80px'}}
            value={newReview.comment}
            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            required
          ></textarea>
          <button type="submit" style={btnStyle}>Save Review</button>
        </form>
      </div>

      <div style={reviewScroll}>
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} style={reviewItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <p style={{ color: '#34495e', margin: 0, flex: 1 }}>"{rev.comment}"</p>
                <button onClick={() => deleteReview(rev.id)} style={deleteBtnStyle}>🗑️ Delete</button>
              </div>
              <b style={{ color: '#1a2a6c', fontSize: '0.9rem' }}>- {rev.reviewerName}</b>
            </div>
          ))
        ) : (
          <p style={{color: '#7f8c8d', textAlign: 'center'}}>No reviews found in database.</p>
        )}
      </div>
    </div>
  );
};

// --- Styles (Same as your Pages.jsx) ---
const containerStyle = { padding: '40px', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', minHeight: '80vh' };
const titleStyle = { color: '#1a2a6c', marginBottom: '25px', borderBottom: '3px solid #f1c40f', display: 'inline-block', paddingBottom: '5px' };
const infoCard = { padding: '25px', backgroundColor: '#f8f9fa', borderRadius: '15px', borderLeft: '6px solid #1a2a6c' };
const cardHeadingStyle = { color: '#1a2a6c', marginTop: 0, marginBottom: '10px' };
const reviewScroll = { display: 'flex', flexDirection: 'column', gap: '15px' };
const reviewItem = { padding: '20px', backgroundColor: '#fff9e6', borderRadius: '12px', border: '1px solid #ffeeba' };
const inputFix = { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '2px solid #ddd', backgroundColor: '#ffffff', color: '#000000', fontSize: '15px', boxSizing: 'border-box', outline: 'none' };
const btnStyle = { backgroundColor: '#1a2a6c', color: '#ffffff', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '16px' };
const deleteBtnStyle = { background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: 'bold' };

export default Reviews;