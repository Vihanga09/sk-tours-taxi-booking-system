import React, { useEffect, useState, useContext } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import AdminHome from './components/AdminHome';
import CustomerHome from './components/CustomerHome'; // ✅ Import the new Customer Home component
import Navbar from './components/Navbar';
import { AboutUs, ContactUs } from './components/Pages'; 
import Reviews from './components/Reviews'; 
import DriverList from './components/DriverList';
import Login from './components/Login';
import Register from './components/Register';
import { ThemeProvider, ThemeContext } from './components/ThemeContext.jsx';

function AppContent() {
  const [bookings, setBookings] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  /**
   * Fetch current user data from LocalStorage to manage 
   * role-based access control (Admin vs Customer).
   */
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const { isDarkMode } = useContext(ThemeContext);

  /**
   * Update the user state immediately after a successful login.
   */
  const handleLogin = () => {
    setUser(JSON.parse(localStorage.getItem('user')));
  };

  /**
   * Fetch all bookings from the Spring Boot backend.
   * This is primarily used for Admin analytics and management.
   */
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bookings/all');
      setBookings(response.data);
    } catch (error) {
      console.error("Error loading bookings", error);
    }
  };

  useEffect(() => { 
    if (user) fetchBookings(); 
  }, [refreshKey, user]);

  const handleUpdate = () => {
    fetchBookings();
    setRefreshKey(prev => prev + 1);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        <Route 
          path="/*" 
          element={
            user ? (
              <div style={{ 
                display: 'flex', 
                width: '100vw', 
                minHeight: '100vh', 
                overflowX: 'hidden',
                backgroundColor: isDarkMode ? '#121212' : '#f4f7f6',
                color: isDarkMode ? '#ffffff' : '#333333',
                transition: 'all 0.3s ease' 
              }}>
                
                {/* ✅ Show Sidebar ONLY for Admin users */}
                {user.role === 'ADMIN' && <Sidebar isOpen={isSidebarOpen} />}
                
                <div style={{ 
                  flex: 1, 
                  /**
                   * Adjust layout based on role: 
                   * Admin gets space for Sidebar, Customer gets full-screen view.
                   */
                  marginLeft: user.role === 'ADMIN' && isSidebarOpen ? '260px' : '0', 
                  transition: 'margin-left 0.3s ease',
                  display: 'flex', 
                  flexDirection: 'column'
                }}>
                  {/* ✅ Navbar handles role-based buttons (like "Book Now") */}
                  <Navbar toggleSidebar={toggleSidebar} userRole={user.role} />
                  
                  <div style={{ padding: '40px', flex: 1 }}>
                    <Routes>
                      {/* ✅ Role-Based Route Switching */}
                      {user.role === 'ADMIN' ? (
                        <>
                          {/* Admin Dashboard Routes */}
                          <Route path="/" element={<AdminHome bookingCount={bookings.length} />} />
                          <Route path="/bookings" element={<BookingList bookings={bookings} onBookingUpdated={handleUpdate} />} />
                          <Route path="/drivers" element={<DriverList />} />
                        </>
                      ) : (
                        <>
                          {/* ✅ Customer Landing Page with Scenic Imagery */}
                          <Route path="/" element={<CustomerHome />} /> 
                          <Route path="/new-booking" element={<BookingForm onBookingSuccess={handleUpdate} key={refreshKey} />} />
                        </>
                      )}
                      
                      {/* Pages accessible by both Admins and Customers */}
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="/reviews" element={<Reviews />} />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;