import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      ...sidebarStyle,
      left: isOpen ? '0' : '-260px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#f1c40f', margin: 0 }}>SK ADMIN</h2>
        <small style={{ color: '#bdc3c7' }}>Taxi Management System</small>
      </div>
      
      <hr style={{ borderColor: '#34495e', marginBottom: '20px' }} />
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{...navItem, backgroundColor: isActive('/') ? '#f1c40f' : 'rgba(255,255,255,0.08)'}}>
          <Link to="/" style={{...linkStyle, color: isActive('/') ? '#1a2a6c' : '#ecf0f1'}}>🏠 Dashboard Home</Link>
        </li>
        
        <li style={{...navItem, backgroundColor: isActive('/new-booking') ? '#f1c40f' : 'rgba(255,255,255,0.08)'}}>
          <Link to="/new-booking" style={{...linkStyle, color: isActive('/new-booking') ? '#1a2a6c' : '#ecf0f1'}}>🚖 New Booking</Link>
        </li>
        
        <li style={{...navItem, backgroundColor: isActive('/bookings') ? '#f1c40f' : 'rgba(255,255,255,0.08)'}}>
          <Link to="/bookings" style={{...linkStyle, color: isActive('/bookings') ? '#1a2a6c' : '#ecf0f1'}}>📊 Manage Bookings</Link>
        </li>
        
        <li style={{...navItem, backgroundColor: isActive('/drivers') ? '#f1c40f' : 'rgba(255,255,255,0.08)'}}>
          <Link to="/drivers" style={{...linkStyle, color: isActive('/drivers') ? '#1a2a6c' : '#ecf0f1'}}>👤 Drivers List</Link>
        </li>

        <li style={{...navItem, backgroundColor: isActive('/reviews') ? '#f1c40f' : 'rgba(255,255,255,0.08)'}}>
          <Link to="/reviews" style={{...linkStyle, color: isActive('/reviews') ? '#1a2a6c' : '#ecf0f1'}}>⭐ Customer Reviews</Link>
        </li>
      </ul>

      {!isOpen && (
        <div style={{ position: 'fixed', left: '10px', top: '80px', color: '#1a2a6c', fontWeight: 'bold' }}>
          Menu ⮕
        </div>
      )}
    </div>
  );
};

// --- CSS STYLES ---
const sidebarStyle = {
  width: '260px',
  backgroundColor: '#1a2a6c',
  color: '#fff',
  padding: '30px 20px',
  height: '100vh',
  position: 'fixed',
  top: 0,
  transition: 'all 0.3s ease',
  boxShadow: '4px 0 15px rgba(0,0,0,0.2)',
  zIndex: 1000,
  boxSizing: 'border-box'
};

const navItem = {
  padding: '12px 15px',
  borderRadius: '8px',
  marginBottom: '10px',
  transition: '0.3s',
  cursor: 'pointer',
};

const linkStyle = {
  textDecoration: 'none',
  fontWeight: 'bold',
  display: 'block',
  fontSize: '0.95rem'
};

export default Sidebar;