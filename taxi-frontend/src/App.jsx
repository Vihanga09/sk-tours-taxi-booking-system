import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';

function App() {
  const [bookings, setBookings] = useState([]);

  // Fetch all tour bookings from the backend
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bookings/all');
      setBookings(response.data);
    } catch (error) {
      console.error("Error: Could not load tour bookings.", error);
    }
  };

  // Initial data load when the app starts
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      width: '100vw', 
      backgroundColor: '#f4f7f6', 
      margin: 0,
      padding: '40px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      overflowX: 'hidden' // FIXED: Removes the black patch/side scroll
    }}>
      <div style={{ 
        width: '90%', 
        maxWidth: '1100px', 
        backgroundColor: '#ffffff', 
        padding: '40px', 
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
      }}>
        
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#1a2a6c', margin: '0', textTransform: 'uppercase' }}>
            🚕 SK TOURS
          </h1>
          <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
            Premium Tourist Ride Management System
          </p>
        </header>

        {/* Form section to book a new tour */}
        <section>
          <BookingForm onBookingSuccess={fetchBookings} />
        </section>

        <div style={{ margin: '50px 0', height: '2px', background: 'linear-gradient(to right, transparent, #f1c40f, transparent)' }} />

        {/* Table section to display and update tours */}
        <section>
          <BookingList 
            bookings={bookings} 
            onBookingUpdated={fetchBookings} 
          />
        </section>

        <footer style={{ textAlign: 'center', marginTop: '60px', color: '#bdc3c7', fontSize: '0.9rem' }}>
          © 2026 SK TOURS - Excellence in Travel
        </footer>
      </div>
    </div>
  );
}

export default App;