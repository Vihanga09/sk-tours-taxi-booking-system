import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

/**
 * Reviews Component
 * Fixed: Re-added Reviewer Name field while maintaining ownership-based logic.
 */
const Reviews = ({ userRole }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ reviewerName: '', comment: '', rating: 5 });
  const [editingId, setEditingId] = useState(null);

  // ✅ Get currently logged-in user session
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isDark = document.body.getAttribute('data-theme') === 'dark';

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/reviews/all');
      setReviews(response.data);
    } catch (error) {
      console.error("--- DEBUG ERROR: API connectivity issue ---", error);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Combined data: Form inputs + Hidden ownership email
      const reviewPayload = {
        ...newReview,
        userEmail: currentUser?.email, // Backend uses this to verify owner
      };

      if (editingId) {
        await axios.put(`http://localhost:8080/api/reviews/update/${editingId}`, reviewPayload);
        Swal.fire('Updated!', 'Your review has been successfully modified.', 'success');
        setEditingId(null);
      } else {
        await axios.post('http://localhost:8080/api/reviews/create', reviewPayload);
        Swal.fire('Submitted', 'Thank you for your feedback!', 'success');
      }
      setNewReview({ reviewerName: '', comment: '', rating: 5 });
      fetchReviews(); 
    } catch (error) {
      Swal.fire('Error', 'Action failed. Check backend connection.', 'error');
    }
  };

  const startEdit = (rev) => {
    setEditingId(rev.id);
    setNewReview({ reviewerName: rev.reviewerName, comment: rev.comment, rating: rev.rating });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteReview = async (id) => {
    const result = await Swal.fire({
      title: 'Confirm Deletion',
      text: "This will permanently remove the review from SK TOURS records!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/reviews/delete/${id}`);
        Swal.fire('Deleted!', 'Review has been removed.', 'success');
        fetchReviews();
      } catch (error) {
        Swal.fire('Error', 'Deletion failed.', 'error');
      }
    }
  };

  return (
    <div style={{...containerStyle, backgroundColor: isDark ? '#1e1e1e' : '#ffffff'}}>
      <h1 style={{...titleStyle, color: isDark ? '#f1c40f' : '#1a2a6c'}}>Customer Experience ⭐</h1>
      
      <div style={{...infoCard, marginBottom: '30px', backgroundColor: isDark ? '#2d2d2d' : '#f8f9fa', borderLeftColor: isDark ? '#f1c40f' : '#1a2a6c'}}>
        <h3 style={{...cardHeadingStyle, color: isDark ? '#f1c40f' : '#1a2a6c'}}>
          {editingId ? "✏️ Edit Your Feedback" : "Add a New Review"}
        </h3>
        <form onSubmit={handleSubmit}>
          {/* ✅ RE-ADDED: Name Input Field */}
          <input 
            type="text" 
            placeholder="Reviewer Name" 
            style={{...inputFix, backgroundColor: isDark ? '#1a1a1a' : '#fff', color: isDark ? '#fff' : '#000', borderColor: isDark ? '#444' : '#ddd'}} 
            value={newReview.reviewerName}
            onChange={(e) => setNewReview({...newReview, reviewerName: e.target.value})}
            required
          />

          <textarea 
            placeholder="Describe your journey with SK TOURS..." 
            style={{...inputFix, height: '80px', backgroundColor: isDark ? '#1a1a1a' : '#fff', color: isDark ? '#fff' : '#000', borderColor: isDark ? '#444' : '#ddd'}}
            value={newReview.comment}
            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            required
          ></textarea>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{...btnStyle, backgroundColor: isDark ? '#f1c40f' : '#1a2a6c', color: isDark ? '#000' : '#fff'}}>
              {editingId ? "Update Review" : "Save Review"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setNewReview({reviewerName: '', comment: '', rating: 5})}} style={{...btnStyle, backgroundColor: '#95a5a6'}}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={reviewScroll}>
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} style={{
              ...reviewItem, 
              backgroundColor: isDark ? '#262626' : '#fff9e6', 
              borderColor: isDark ? '#333' : '#ffeeba'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <p style={{ color: isDark ? '#ecf0f1' : '#34495e', margin: 0, flex: 1, fontStyle: 'italic' }}>"{rev.comment}"</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  
                  {/* ✅ OWNERSHIP CHECK: Logic verifies if current email matches DB entry */}
                  {currentUser?.email === rev.userEmail && (
                    <button onClick={() => startEdit(rev)} style={editBtnStyle}>✏️ Edit</button>
                  )}
                  
                  {userRole === 'ADMIN' && (
                    <button onClick={() => deleteReview(rev.id)} style={deleteBtnStyle}>🗑️ Delete</button>
                  )}
                </div>
              </div>
              <b style={{ color: isDark ? '#f1c40f' : '#1a2a6c', fontSize: '0.9rem' }}>- {rev.reviewerName}</b>
            </div>
          ))
        ) : (
          <p style={{color: isDark ? '#bdc3c7' : '#7f8c8d', textAlign: 'center'}}>No feedback available at the moment.</p>
        )}
      </div>
    </div>
  );
};

// --- STYLES ---
const containerStyle = { padding: '40px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', minHeight: '80vh' };
const titleStyle = { marginBottom: '25px', borderBottom: '3px solid #f1c40f', display: 'inline-block', paddingBottom: '5px' };
const infoCard = { padding: '25px', borderRadius: '15px', borderLeft: '6px solid' };
const cardHeadingStyle = { marginTop: 0, marginBottom: '10px' };
const reviewScroll = { display: 'flex', flexDirection: 'column', gap: '15px' };
const reviewItem = { padding: '20px', borderRadius: '12px', border: '1px solid', transition: '0.3s' };
const inputFix = { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '2px solid', fontSize: '15px', boxSizing: 'border-box', outline: 'none' };
const btnStyle = { border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '16px', transition: '0.2s' };
const deleteBtnStyle = { background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' };
const editBtnStyle = { background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' };

export default Reviews;