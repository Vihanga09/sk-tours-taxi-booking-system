import React, { useEffect, useState, useContext } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import AdminHome from './components/AdminHome';
import CustomerHome from './components/CustomerHome'; 
import Navbar from './components/Navbar';
import { AboutUs, ContactUs } from './components/Pages'; 
import Reviews from './components/Reviews'; 
import DriverList from './components/DriverList';
import Login from './components/Login';
import Register from './components/Register';
import BookingReceipt from './components/BookingReceipt'; 
import MyBookings from './components/MyBookings'; // ✅ Added the MyBookings component import
import { ThemeProvider, ThemeContext } from './components/ThemeContext.jsx';


/**
 * AppContent Component
 * Orchestrates the primary routing and layout logic for SK TOURS.
 * Implements Role-Based Access Control (RBAC) and Theme management.
 */
function AppContent() {
  const [bookings, setBookings] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Retrieve session data to maintain user state and permissions
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const { isDarkMode } = useContext(ThemeContext);

  /**
   * Syncs the local user state with localStorage upon successful login.
   */
  const handleLogin = () => {
    setUser(JSON.parse(localStorage.getItem('user')));
  };

  /**
   * Fetches the global booking list for Admin management.
   */
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bookings/all');
      setBookings(response.data);
    } catch (error) {
      console.error("DEBUG: Failed to communicate with Spring Boot API", error);
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
        {/* Public Authentication Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes Wrapper */}
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
                transition: 'background-color 0.3s ease' 
              }}>
                
                {/* Sidebar visibility control based on user role */}
                {user.role === 'ADMIN' && (
                  <Sidebar isOpen={isSidebarOpen} userRole={user.role} />
                )}
                
                <div style={{ 
                  flex: 1, 
                  marginLeft: user.role === 'ADMIN' && isSidebarOpen ? '260px' : '0', 
                  transition: 'margin-left 0.3s ease',
                  display: 'flex', 
                  flexDirection: 'column'
                }}>
                  {/* Navbar manages role-based CTAs and sidebar toggling */}
                  <Navbar toggleSidebar={toggleSidebar} userRole={user.role} />
                  
                  <div style={{ padding: '40px', flex: 1 }}>
                    <Routes>
                      {/* Role-Based Route Switching */}
                      {user.role === 'ADMIN' ? (
                        <>
                          {/* Admin Specific Routes */}
                          <Route path="/" element={<AdminHome bookingCount={bookings.length} />} />
                          <Route path="/bookings" element={<BookingList bookings={bookings} onBookingUpdated={handleUpdate} />} />
                          <Route path="/drivers" element={<DriverList />} />
                        </>
                      ) : (
                        <>
                          {/* Customer Specific Routes */}
                          <Route path="/" element={<CustomerHome />} /> 
                          <Route path="/new-booking" element={<BookingForm onBookingSuccess={handleUpdate} key={refreshKey} />} />
                          
                          {/* ✅ My Bookings History Page */}
                          <Route path="/my-bookings" element={<MyBookings />} />
                          
                          {/* ✅ Receipt Page - Displays detailed booking info */}
                          <Route path="/booking-receipt/:id" element={<BookingReceipt />} />
                        </>
                      )}
                      
                      {/* Shared Information and Review Pages */}
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="/reviews" element={<Reviews userRole={user.role} />} />
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

/**
 * Main App Entry Point
 * Wraps the application with the Global Theme Context Provider.
 */
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;