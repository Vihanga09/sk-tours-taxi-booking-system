import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BookingForm = ({ onBookingSuccess }) => {
  const [availableDrivers, setAvailableDrivers] = useState([]);
  
  // ✅ ID එක විතරක් නැතුව සම්පූර්ණ Driver Object එකම තියාගන්න state එකක් හැදුවා
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  const [formData, setFormData] = useState({
    passengerName: '',
    pickupLocation: '',
    destination: '',
    distance: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ දැන් check කරන්නේ selectedDriver object එක තියෙනවද කියලා
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
        driverId: selectedDriver.id, // Object එකෙන් ID එක ගන්නවා
        pickupLocation: formData.pickupLocation,
        destination: formData.destination,
        distance: parseFloat(formData.distance) 
      };

      const response = await axios.post('http://localhost:8080/api/bookings/create', bookingData);
      
      Swal.fire({
        title: 'Booking Confirmed!',
        // ✅ මෙන්න මෙතන තමයි ID එක වෙනුවට නම වැටෙන්න හැදුවේ
        text: `Success! Your tour with ${selectedDriver.driverName} is confirmed.`,
        icon: 'success',
        confirmButtonColor: '#1a2a6c'
      });
      
      setFormData({ passengerName: '', pickupLocation: '', destination: '', distance: '' });
      setSelectedDriver(null); // Reset selection
      
      onBookingSuccess();
      fetchAvailableDrivers(); 

    } catch (error) {
      Swal.fire('Booking Failed', 'Make sure the backend is running.', 'error');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={headerStyle}>🚖 SK TOURS - Modern Booking</h2>
      <p style={subHeaderStyle}>Enter details and select your guide.</p>
      
      <form onSubmit={handleSubmit}>
        <div style={gridStyle}>
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

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Distance (km)</label>
            <input 
              type="number" 
              placeholder="Enter km" 
              value={formData.distance} 
              onChange={e => setFormData({...formData, distance: e.target.value})} 
              required 
              style={inputStyle} 
            />
          </div>

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

        <div style={{ marginTop: '30px' }}>
          <label style={labelStyle}>Available Tour Guides:</label>
          <div style={driverGridStyle}>
            {availableDrivers.length > 0 ? (
              availableDrivers.map(driver => (
                <div 
                  key={driver.id} 
                  // ✅ මෙතනදී මුළු driver object එකම state එකට දානවා
                  onClick={() => setSelectedDriver(driver)}
                  style={driverCardStyle(selectedDriver?.id === driver.id)}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👤</div>
                  <div style={{ fontWeight: 'bold', color: '#1a2a6c' }}>{driver.driverName}</div>
                  <div style={{ fontSize: '0.8rem', color: '#555' }}>{driver.vehicleType}</div>
                  {selectedDriver?.id === driver.id && <div style={selectedTag}>SELECTED ✅</div>}
                </div>
              ))
            ) : (
              <div style={noDriverStyle}>⚠️ No drivers are available at the moment.</div>
            )}
          </div>
        </div>

        <button type="submit" style={submitBtnStyle}>CONFIRM MY SK TOURS RESERVATION</button>
      </form>
    </div>
  );
};

// --- Styles (පරණ ඒවා එහෙම්මමයි) ---
const formContainerStyle = { backgroundColor: '#ffffff', padding: '35px', borderRadius: '15px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' };
const headerStyle = { margin: '0 0 8px 0', color: '#1a2a6c', fontWeight: 'bold', fontSize: '1.8rem' };
const subHeaderStyle = { margin: '0 0 30px 0', color: '#7f8c8d', fontSize: '1rem' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '0.9rem', fontWeight: 'bold', color: '#34495e', textTransform: 'uppercase' };
const inputStyle = { padding: '14px', borderRadius: '8px', border: '1px solid #d1d1d1', backgroundColor: '#fcfcfc', color: '#000', fontSize: '1rem', outline: 'none' };
const driverGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', marginTop: '15px' };
const driverCardStyle = (isSelected) => ({ padding: '20px', borderRadius: '12px', border: isSelected ? '2px solid #f1c40f' : '1px solid #e0e0e0', backgroundColor: isSelected ? '#fff9e6' : '#fff', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease', transform: isSelected ? 'scale(1.05)' : 'scale(1)' });
const selectedTag = { fontSize: '11px', color: '#f39c12', fontWeight: 'bold', marginTop: '10px' };
const noDriverStyle = { gridColumn: 'span 3', padding: '20px', backgroundColor: '#fff5f5', color: '#c53030', borderRadius: '8px', textAlign: 'center' };
const submitBtnStyle = { width: '100%', padding: '18px', backgroundColor: '#1a2a6c', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '40px', fontSize: '1.1rem' };

export default BookingForm;