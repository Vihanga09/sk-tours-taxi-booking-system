import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BookingList = ({ bookings, onBookingUpdated }) => {
  // --- SEARCH STATE ---
  const [searchTerm, setSearchTerm] = useState("");

  // Check if Dark Mode is active
  const isDark = document.body.getAttribute('data-theme') === 'dark';

  // 1. Function to delete a booking (Cancel)
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This booking will be deleted and the driver will be free!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/bookings/delete/${id}`);
        Swal.fire('Deleted!', 'Booking removed successfully.', 'success');
        onBookingUpdated(); // UI Refresh
      } catch (error) {
        Swal.fire('Error', 'Could not delete the booking.', 'error');
      }
    }
  };

  // 2. Function to mark booking as Completed
  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/bookings/complete/${id}`);
      
      Swal.fire({
        title: 'Ride Completed!',
        text: 'The driver is now free for another tour.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      onBookingUpdated(); 
    } catch (error) {
      console.error("Status update error:", error);
      Swal.fire('Error', 'Failed to update status.', 'error');
    }
  };

  // --- SEARCH LOGIC ---
  const filteredBookings = bookings.filter(b => 
    b.passenger?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.driver?.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toString().includes(searchTerm)
  );

  return (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ 
        color: isDark ? '#f1c40f' : '#1a2a6c', 
        borderBottom: `3px solid ${isDark ? '#f1c40f' : '#1a2a6c'}`, 
        paddingBottom: '10px', 
        marginBottom: '20px' 
      }}>
        SK TOURS - Recent Booking List
      </h2>

      {/* --- SEARCH BAR SECTION --- */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <b style={{ color: isDark ? '#ecf0f1' : '#333' }}>🔍 Search:</b>
        <input 
          type="text" 
          placeholder="Search by Passenger or Driver name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            ...searchBarStyle,
            backgroundColor: isDark ? '#2d2d2d' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            borderColor: isDark ? '#444' : '#ddd'
          }}
        />
      </div>

      <div style={{ 
        overflowX: 'auto', 
        borderRadius: '10px', 
        boxShadow: isDark ? '0 0 20px rgba(0,0,0,0.5)' : '0 0 20px rgba(0,0,0,0.15)' 
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          backgroundColor: isDark ? '#1e1e1e' : '#ffffff', 
          minWidth: '800px' 
        }}>
          <thead>
            <tr style={{ backgroundColor: isDark ? '#333' : '#1a2a6c', color: '#ffffff', textAlign: 'left' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Passenger</th>
              <th style={thStyle}>Driver</th>
              <th style={thStyle}>Route Details</th>
              <th style={thStyle}>Total Fare</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Management</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: isDark ? '#bdc3c7' : '#7f8c8d' }}>
                  No bookings found in SK TOURS records.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b, index) => (
                <tr key={b.id} style={{ 
                  backgroundColor: isDark 
                    ? (index % 2 === 0 ? '#262626' : '#1e1e1e') 
                    : (index % 2 === 0 ? '#f8f9fa' : '#ffffff'),
                  borderBottom: `2px solid ${isDark ? '#333' : '#dee2e6'}` 
                }}>
                  <td style={{ ...tdStyle, color: isDark ? '#ecf0f1' : '#333' }}>{b.id}</td>
                  <td style={{ ...tdStyle, fontWeight: 'bold', color: isDark ? '#f1c40f' : '#000' }}>{b.passenger?.name}</td>
                  <td style={{ ...tdStyle, color: isDark ? '#ecf0f1' : '#333' }}>{b.driver?.driverName}</td>
                  <td style={tdStyle}>
                    <span style={{ color: '#3498db', fontWeight: '500' }}>{b.pickupLocation}</span> 
                    <span style={{ margin: '0 8px', color: isDark ? '#fff' : '#000' }}>➔</span> 
                    <span style={{ color: isDark ? '#1abc9c' : '#2c3e50', fontWeight: '500' }}>{b.destination}</span>
                  </td>
                  <td style={{ ...tdStyle, color: '#e67e22', fontWeight: 'bold' }}>LKR {b.totalFare}</td>
                  <td style={tdStyle}>
                    <span style={statusBadge(b.status, isDark)}>{b.status}</span>
                  </td>
                  <td style={tdStyle}>
                    {b.status === 'CONFIRMED' && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleComplete(b.id)} style={btnStyle('#27ae60')}>Complete</button>
                        <button onClick={() => handleDelete(b.id)} style={btnStyle('#e74c3c')}>Cancel</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- STYLES ---
const thStyle = { padding: '15px', borderBottom: '2px solid #f1c40f' };
const tdStyle = { padding: '15px' };

const searchBarStyle = {
  padding: '10px 15px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  width: '300px',
  outline: 'none',
  fontSize: '14px'
};

const btnStyle = (color) => ({
  backgroundColor: color,
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
});

const statusBadge = (status, isDark) => ({
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: 'bold',
  display: 'inline-block',
  backgroundColor: isDark 
    ? (status === 'COMPLETED' ? '#1b4d2e' : status === 'CANCELLED' ? '#5c191e' : '#5c4d19')
    : (status === 'COMPLETED' ? '#d4edda' : status === 'CANCELLED' ? '#f8d7da' : '#fff3cd'),
  color: isDark ? '#ffffff' : (status === 'COMPLETED' ? '#155724' : status === 'CANCELLED' ? '#721c24' : '#856404'),
  border: `1px solid ${isDark ? 'transparent' : (status === 'COMPLETED' ? '#c3e6cb' : status === 'CANCELLED' ? '#f5c6cb' : '#ffeeba')}`
});

export default BookingList;