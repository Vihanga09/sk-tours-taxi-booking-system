import React, { useEffect, useState, useContext } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import AdminHome from './components/AdminHome';
import Navbar from './components/Navbar';
import { AboutUs, ContactUs } from './components/Pages'; 
import Reviews from './components/Reviews'; 
import DriverList from './components/DriverList';
import Login from './components/Login'; // ✅ Login එක import කළා
import { ThemeProvider, ThemeContext } from './components/ThemeContext.jsx';

function AppContent() {
  const [bookings, setBookings] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // ✅ Login වුණාද නැද්ද කියලා බලන්න state එකක් (දැනට false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { isDarkMode } = useContext(ThemeContext);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bookings/all');
      setBookings(response.data);
    } catch (error) {
      console.error("Error loading bookings", error);
    }
  };

  useEffect(() => { 
    if (isAuthenticated) fetchBookings(); 
  }, [refreshKey, isAuthenticated]);

  const handleUpdate = () => {
    fetchBookings();
    setRefreshKey(prev => prev + 1);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Routes>
        {/* ✅ මුලින්ම පෙන්වන්නේ Login Page එක */}
        <Route 
          path="/login" 
          element={<Login onLogin={() => setIsAuthenticated(true)} />} 
        />

        {/* ✅ Login වෙලා නැත්නම් හැමවෙලේම Login එකට හරවලා යවනවා */}
        <Route 
          path="/*" 
          element={
            isAuthenticated ? (
              <div style={{ 
                display: 'flex', 
                width: '100vw', 
                minHeight: '100vh', 
                overflowX: 'hidden',
                backgroundColor: isDarkMode ? '#121212' : '#f4f7f6',
                color: isDarkMode ? '#ffffff' : '#333333',
                transition: 'all 0.3s ease' 
              }}>
                <Sidebar isOpen={isSidebarOpen} />
                <div style={{ 
                  flex: 1, 
                  marginLeft: isSidebarOpen ? '260px' : '0', 
                  transition: 'margin-left 0.3s ease',
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
                      <Route path="/drivers" element={<DriverList />} /> 
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