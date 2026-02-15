import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation

const BookingForm = ({ onBookingSuccess }) => {
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const navigate = useNavigate(); // Initialize navigation
  
  // Stores the entire selected driver object
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  const [formData, setFormData] = useState({
    passengerName: '',
    passengerEmail: '',
    country: '',       // ✅ අලුතින් එකතු කළා
    phoneNumber: '',   // ✅ අලුතින් එකතු කළා
    pickupLocation: '',
    destination: '',
    distance: ''
  });

  // Check if Dark Mode is active (based on your existing theme toggle)
  const isDark = document.body.getAttribute('data-theme') === 'dark';

  /**
   * Fetch available drivers from the Spring Boot backend
   */
  const fetchAvailableDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/drivers/available');
      setAvailableDrivers(response.data);
    } catch (error) {
      console.error("--- DEBUG ERROR: Could not fetch drivers ---", error);
    }
  };

  useEffect(() => {
    fetchAvailableDrivers();
  }, []);

  /**
   * Handle form submission and booking creation
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate if a driver is selected before submitting
    if (!selectedDriver) {
      Swal.fire({
        title: 'Driver Required',
        text: 'Please choose your preferred driver from the available cards.',
        icon: 'warning'
      });
      return;
    }

    try {
      const bookingData = { 
        passengerName: formData.passengerName, 
        passengerEmail: formData.passengerEmail,
        country: formData.country,             
        phoneNumber: formData.phoneNumber,     
        driverId: selectedDriver.id, 
        pickupLocation: formData.pickupLocation,
        destination: formData.destination,
        distance: parseFloat(formData.distance) 
      };

      // Send the booking request to the backend
      const response = await axios.post('http://localhost:8080/api/bookings/create', bookingData);
      
      // Get the saved booking data (including the generated ID and Fare)
      const savedBooking = response.data;

      // Show a quick success message before redirecting to the Receipt Page
      Swal.fire({
        title: 'Processing...',
        text: 'Your booking is confirmed. Check your email for confirmation!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      
      // Reset form and selection state
      setFormData({ 
        passengerName: '', 
        passengerEmail: '', 
        country: '', 
        phoneNumber: '', 
        pickupLocation: '', 
        destination: '', 
        distance: '' 
      });
      setSelectedDriver(null); 
      
      // Trigger global state refresh if needed
      onBookingSuccess();
      
      // ✅ REDIRECT: Send the user to the dedicated Receipt Page using the new booking ID
      setTimeout(() => {
        navigate(`/booking-receipt/${savedBooking.id}`);
      }, 1600);

    } catch (error) {
      Swal.fire('Booking Failed', 'Make sure the backend server is running.', 'error');
    }
  };

  // --- Dynamic Styles based on Theme ---
  const dynamicContainer = {
    ...formContainerStyle,
    backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
    borderColor: isDark ? '#333' : '#eee',
  };

  const dynamicInput = {
    ...inputStyle,
    backgroundColor: isDark ? '#2d2d2d' : '#fcfcfc',
    color: isDark ? '#ffffff' : '#000000',
    borderColor: isDark ? '#444' : '#d1d1d1'
  };

  const dynamicLabel = {
    ...labelStyle,
    color: isDark ? '#ecf0f1' : '#34495e'
  };

  return (
    <div style={dynamicContainer}>
      <h2 style={{...headerStyle, color: isDark ? '#f1c40f' : '#1a2a6c'}}>🚖 SK TOURS - Modern Booking</h2>
      <p style={{...subHeaderStyle, color: isDark ? '#bdc3c7' : '#7f8c8d'}}>Enter details and select your guide.</p>
      
      <form onSubmit={handleSubmit}>
        <div style={gridStyle}>
          <div style={inputGroupStyle}>
            <label style={dynamicLabel}>Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. John Doe" 
              value={formData.passengerName} 
              onChange={e => setFormData({...formData, passengerName: e.target.value})} 
              required 
              style={dynamicInput} 
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={dynamicLabel}>Email Address</label>
            <input 
              type="email" 
              placeholder="e.g. john@example.com" 
              value={formData.passengerEmail} 
              onChange={e => setFormData({...formData, passengerEmail: e.target.value})} 
              required 
              style={dynamicInput} 
            />
          </div>

          {/* ✅ Country Field */}
          <div style={inputGroupStyle}>
            <label style={dynamicLabel}>Country</label>
            <input 
              type="text" 
              placeholder="e.g. Sri Lanka" 
              value={formData.country} 
              onChange={e => setFormData({...formData, country: e.target.value})} 
              required 
              style={dynamicInput} 
            />
          </div>

          {/* ✅ Phone Number Field */}
          <div style={inputGroupStyle}>
            <label style={dynamicLabel}>Phone Number</label>
            <input 
              type="text" 
              placeholder="e.g. +94 77 123 4567" 
              value={formData.phoneNumber} 
              onChange={e => setFormData({...formData, phoneNumber: e.target.value})} 
              required 
              style={dynamicInput} 
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={dynamicLabel}>Distance (km)</label>
            <input 
              type="number" 
              placeholder="Enter km" 
              value={formData.distance} 
              onChange={e => setFormData({...formData, distance: e.target.value})} 
              required 
              style={dynamicInput} 
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={dynamicLabel}>Pickup Location</label>
            <input 
              type="text" 
              placeholder="Airport / Hotel" 
              value={formData.pickupLocation} 
              onChange={e => setFormData({...formData, pickupLocation: e.target.value})} 
              required 
              style={dynamicInput} 
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={dynamicLabel}>Destination</label>
            <input 
              type="text" 
              placeholder="Travel spot" 
              value={formData.destination} 
              onChange={e => setFormData({...formData, destination: e.target.value})} 
              required 
              style={dynamicInput} 
            />
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <label style={dynamicLabel}>Available Tour Guides:</label>
          <div style={driverGridStyle}>
            {availableDrivers.length > 0 ? (
              availableDrivers.map(driver => (
                <div 
                  key={driver.id} 
                  onClick={() => setSelectedDriver(driver)}
                  style={{
                    ...driverCardStyle(selectedDriver?.id === driver.id),
                    backgroundColor: isDark 
                      ? (selectedDriver?.id === driver.id ? '#3d3d29' : '#262626') 
                      : (selectedDriver?.id === driver.id ? '#fff9e6' : '#fff'),
                    borderColor: isDark ? '#444' : (selectedDriver?.id === driver.id ? '#f1c40f' : '#e0e0e0'),
                    color: isDark ? '#fff' : '#000'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👤</div>
                  <div style={{ fontWeight: 'bold', color: isDark ? '#f1c40f' : '#1a2a6c' }}>{driver.driverName}</div>
                  <div style={{ fontSize: '0.8rem', color: isDark ? '#bdc3c7' : '#555' }}>{driver.vehicleType}</div>
                  {selectedDriver?.id === driver.id && <div style={selectedTag}>SELECTED ✅</div>}
                </div>
              ))
            ) : (
              <div style={{...noDriverStyle, backgroundColor: isDark ? '#442222' : '#fff5f5'}}>
                ⚠️ No drivers are available at the moment.
              </div>
            )}
          </div>
        </div>

        <button type="submit" style={{
          ...submitBtnStyle,
          backgroundColor: isDark ? '#f1c40f' : '#1a2a6c',
          color: isDark ? '#000' : '#fff'
        }}>
          CONFIRM MY SK TOURS RESERVATION
        </button>
      </form>
    </div>
  );
};

// --- Constant Static Styles ---
const formContainerStyle = { padding: '35px', borderRadius: '15px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' };
const headerStyle = { margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '1.8rem' };
const subHeaderStyle = { margin: '0 0 30px 0', fontSize: '1rem' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase' };
const inputStyle = { padding: '14px', borderRadius: '8px', border: '1px solid #d1d1d1', fontSize: '1rem', outline: 'none' };
const driverGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', marginTop: '15px' };
const driverCardStyle = (isSelected) => ({ padding: '20px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease', transform: isSelected ? 'scale(1.05)' : 'scale(1)' });
const selectedTag = { fontSize: '11px', color: '#f39c12', fontWeight: 'bold', marginTop: '10px' };
const noDriverStyle = { gridColumn: 'span 3', padding: '20px', color: '#c53030', borderRadius: '8px', textAlign: 'center' };
const submitBtnStyle = { width: '100%', padding: '18px', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '40px', fontSize: '1.1rem' };

export default BookingForm;