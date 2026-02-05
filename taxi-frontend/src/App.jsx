import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import AdminHome from './components/AdminHome';
import Navbar from './components/Navbar';
import { AboutUs, ContactUs } from './components/Pages'; 
import Reviews from './components/Reviews'; 
import DriverList from './components/DriverList'; // ✅ 1. DriverList එක import කළා

function App() {
  const [bookings, setBookings] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bookings/all');
      setBookings(response.data);
    } catch (error) {
      console.error("Error loading bookings", error);
    }
  };

  useEffect(() => { fetchBookings(); }, [refreshKey]);

  const handleUpdate = () => {
    fetchBookings();
    setRefreshKey(prev => prev + 1);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', overflowX: 'hidden' }}>
        <Sidebar isOpen={isSidebarOpen} />

        <div style={{ 
          flex: 1, 
          marginLeft: isSidebarOpen ? '260px' : '0', 
          transition: 'margin-left 0.3s ease',
          backgroundColor: '#f4f7f6', 
          display: 'flex', 
          flexDirection: 'column'
        }}>
          
          <Navbar toggleSidebar={toggleSidebar} />

          <div style={{ padding: '40px', flex: 1 }}>
            <Routes>
              <Route path="/" element={<AdminHome bookingCount={bookings.length} />} />
              <Route path="/new-booking" element={<BookingForm onBookingSuccess={handleUpdate} key={refreshKey} />} />
              <Route path="/bookings" element={<BookingList bookings={bookings} onBookingUpdated={handleUpdate} />} />
              
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/reviews" element={<Reviews />} />
              
              {/* ✅ 2. Drivers List එකට Route එක දැම්මා */}
              <Route path="/drivers" element={<DriverList />} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;