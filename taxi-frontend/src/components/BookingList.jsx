import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BookingList = ({ bookings, onBookingUpdated }) => {

  // ... handleComplete and handleDelete functions remain the same as before

  return (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ color: '#1a2a6c', borderBottom: '3px solid #f1c40f', paddingBottom: '10px', marginBottom: '20px' }}>
        SK TOURS - Recent Booking List
      </h2>
      <div style={{ overflowX: 'auto', borderRadius: '10px', boxShadow: '0 0 20px rgba(0,0,0,0.15)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff', minWidth: '800px' }}>
          <thead>
            <tr style={{ backgroundColor: '#1a2a6c', color: '#ffffff', textAlign: 'left' }}>
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
            {bookings.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>No bookings found in SK TOURS records.</td></tr>
            ) : (
              bookings.map((b, index) => (
                <tr key={b.id} style={{ 
                  backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff', // Zebra stripes for better visibility
                  borderBottom: '2px solid #dee2e6' // Thicker border
                }}>
                  <td style={tdStyle}>{b.id}</td>
                  <td style={{ ...tdStyle, fontWeight: 'bold' }}>{b.passenger?.name}</td>
                  <td style={tdStyle}>{b.driver?.driverName}</td>
                  <td style={tdStyle}>
                    <span style={{ color: '#3498db', fontWeight: '500' }}>{b.pickupLocation}</span> 
                    <span style={{ margin: '0 8px' }}>➔</span> 
                    <span style={{ color: '#2c3e50', fontWeight: '500' }}>{b.destination}</span>
                  </td>
                  <td style={{ ...tdStyle, color: '#e67e22', fontWeight: 'bold' }}>LKR {b.totalFare}</td>
                  <td style={tdStyle}>
                    <span style={statusBadge(b.status)}>{b.status}</span>
                  </td>
                  <td style={tdStyle}>
                    {b.status !== 'COMPLETED' && (
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

// CSS Styles
const thStyle = { padding: '15px', borderBottom: '2px solid #f1c40f' };
const tdStyle = { padding: '15px', color: '#333' }; // Darker text for readability

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

const statusBadge = (status) => ({
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: 'bold',
  display: 'inline-block',
  backgroundColor: status === 'COMPLETED' ? '#d4edda' : '#fff3cd',
  color: status === 'COMPLETED' ? '#155724' : '#856404',
  border: status === 'COMPLETED' ? '1px solid #c3e6cb' : '1px solid #ffeeba'
});

export default BookingList;