import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BookingForm = ({ onBookingSuccess }) => {
  // States to manage available drivers and selection
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  
  // State for the main booking form fields
  const [formData, setFormData] = useState({
    passengerName: '', // Supporting name-based booking for modern UX
    pickupLocation: '',
    destination: '',
    distance: ''
  });

  // Fetch only free drivers from the SK TOURS database
  const fetchAvailableDrivers = async () => {
    console.log("--- DEBUG: Fetching available drivers for selection cards ---");
    try {
      const response = await axios.get('http://localhost:8080/api/drivers/available');
      setAvailableDrivers(response.data);
      console.log("--- DEBUG: Drivers loaded: ", response.data.length);
    } catch (error) {
      console.error("--- DEBUG ERROR: Could not fetch drivers ---", error);
    }
  };

  // Load drivers when the component mounts
  useEffect(() => {
    fetchAvailableDrivers();
  }, []);

  // Handle the form submission process
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("--- DEBUG: Submit button clicked ---");

    // Validation: Ensure a driver is physically selected from the grid
    if (!selectedDriverId) {
      console.log("--- DEBUG: Validation failed - No driver selected ---");
      Swal.fire({
        title: 'Driver Required',
        text: 'Please choose your preferred driver from the available cards.',
        icon: 'warning'
      });
      return;
    }

    try {
      // Prepare the request payload matching the Backend's BookingRequest DTO
      const bookingData = { 
        passengerName: formData.passengerName, 
        driverId: selectedDriverId,
        pickupLocation: formData.pickupLocation,
        destination: formData.destination,
        distance: parseFloat(formData.distance) 
      };

      console.log("--- DEBUG: Sending Booking Data: ", bookingData);

      // POST request to create the tour booking
      const response = await axios.post('http://localhost:8080/api/bookings/create', bookingData);
      
      console.log("--- DEBUG: Server response: ", response.data);

      Swal.fire({
        title: 'Booking Confirmed!',
        text: `Success! Your tour with driver ID ${selectedDriverId} is confirmed.`,
        icon: 'success',
        confirmButtonColor: '#1a2a6c'
      });
      
      // Reset form fields after successful booking
      setFormData({ passengerName: '', pickupLocation: '', destination: '', distance: '' });
      setSelectedDriverId(null);
      
      // Refresh parent list and local driver grid
      onBookingSuccess();
      fetchAvailableDrivers(); 

    } catch (error) {
      console.error("--- DEBUG ERROR: API Call Failed ---", error);
      Swal.fire('Booking Failed', 'Make sure the backend is running and the driver is still free.', 'error');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={headerStyle}>🚖 SK TOURS - Modern Booking</h2>
      <p style={subHeaderStyle}>Enter your details and select a professional guide from the list below.</p>
      
      <form onSubmit={handleSubmit}>
        <div style={gridStyle}>
          {/* Passenger Input */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. John Doe" 
              value={formData.passengerName} 
              onChange={e => setFormData({...formData, passengerName: e.target.value})} 
              required 
              style={inputStyle} 
            />
          </div>

          {/* Distance Input */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Distance (km)</label>
            <input 
              type="number" 
              min="1" 
              placeholder="Enter km" 
              value={formData.distance} 
              onChange={e => setFormData({...formData, distance: e.target.value})} 
              required 
              style={inputStyle} 
            />
          </div>

          {/* Pickup Point */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Pickup Location</label>
            <input 
              type="text" 
              placeholder="Airport / Hotel" 
              value={formData.pickupLocation} 
              onChange={e => setFormData({...formData, pickupLocation: e.target.value})} 
              required 
              style={inputStyle} 
            />
          </div>

          {/* Destination Point */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Destination</label>
            <input 
              type="text" 
              placeholder="Travel spot" 
              value={formData.destination} 
              onChange={e => setFormData({...formData, destination: e.target.value})} 
              required 
              style={inputStyle} 
            />
          </div>
        </div>

        {/* --- Interactive Driver Selection Grid --- */}
        <div style={{ marginTop: '30px' }}>
          <label style={labelStyle}>Available Tour Guides:</label>
          <div style={driverGridStyle}>
            {availableDrivers.length > 0 ? (
              availableDrivers.map(driver => (
                <div 
                  key={driver.id} 
                  onClick={() => setSelectedDriverId(driver.id)}
                  style={driverCardStyle(selectedDriverId === driver.id)}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👤</div>
                  <div style={{ fontWeight: 'bold', color: '#1a2a6c', fontSize: '1rem' }}>{driver.driverName}</div>
                  <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '4px' }}>{driver.vehicleType}</div>
                  {selectedDriverId === driver.id && <div style={selectedTag}>SELECTED ✅</div>}
                </div>
              ))
            ) : (
              <div style={noDriverStyle}>⚠️ No drivers are available for booking at the moment.</div>
            )}
          </div>
        </div>

        <button type="submit" style={submitBtnStyle}>CONFIRM MY SK TOURS RESERVATION</button>
      </form>
    </div>
  );
};

// --- Modern Professional Styling ---
const formContainerStyle = { backgroundColor: '#ffffff', padding: '35px', borderRadius: '15px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' };
const headerStyle = { margin: '0 0 8px 0', color: '#1a2a6c', fontWeight: 'bold', fontSize: '1.8rem' };
const subHeaderStyle = { margin: '0 0 30px 0', color: '#7f8c8d', fontSize: '1rem' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '0.9rem', fontWeight: 'bold', color: '#34495e', textTransform: 'uppercase' };
const inputStyle = { padding: '14px', borderRadius: '8px', border: '1px solid #d1d1d1', backgroundColor: '#fcfcfc', color: '#000', fontSize: '1rem', outline: 'none' };
const driverGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', marginTop: '15px' };

const driverCardStyle = (isSelected) => ({ 
  padding: '20px', borderRadius: '12px', 
  border: isSelected ? '2px solid #f1c40f' : '1px solid #e0e0e0', 
  backgroundColor: isSelected ? '#fff9e6' : '#fff', 
  textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease',
  boxShadow: isSelected ? '0 5px 15px rgba(241, 196, 15, 0.3)' : 'none',
  transform: isSelected ? 'scale(1.05)' : 'scale(1)'
});

const selectedTag = { fontSize: '11px', color: '#f39c12', fontWeight: 'bold', marginTop: '10px', letterSpacing: '1px' };
const noDriverStyle = { gridColumn: 'span 3', padding: '20px', backgroundColor: '#fff5f5', color: '#c53030', borderRadius: '8px', textAlign: 'center', fontStyle: 'italic' };
const submitBtnStyle = { width: '100%', padding: '18px', backgroundColor: '#1a2a6c', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '40px', fontSize: '1.1rem', letterSpacing: '1px', transition: 'background 0.3s' };

export default BookingForm;