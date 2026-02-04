import React from 'react';
import { Link } from 'react-router-dom';

// App.jsx එකෙන් එවන isOpen prop එක මෙතනට ගන්නවා
const Sidebar = ({ isOpen }) => {
  return (
    <div style={{
      ...sidebarStyle,
      left: isOpen ? '0' : '-260px', // ✅ Sidebar එක open නම් පේනවා, නැත්තම් වමට හංගනවා
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#f1c40f', margin: 0 }}>SK ADMIN</h2>
        <small style={{ color: '#bdc3c7' }}>Taxi Management</small>
      </div>
      
      <hr style={{ borderColor: '#34495e', marginBottom: '20px' }} />
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={navItem}>
          <Link to="/" style={linkStyle}>🏠 Dashboard Home</Link>
        </li>
        <li style={navItem}>
          <Link to="/new-booking" style={linkStyle}>🚖 New Booking</Link>
        </li>
        <li style={navItem}>
          <Link to="/bookings" style={linkStyle}>📊 Manage Bookings</Link>
        </li>
        <li style={navItem}>
          <Link to="/drivers" style={linkStyle}>👤 Drivers List</Link>
        </li>
      </ul>

      {/* Sidebar එක වැහිලා තියෙද්දී admin ට පොඩි reminder එකක් */}
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
  transition: 'all 0.3s ease', // ✅ මේකෙන් තමයි ලස්සනට slide වෙන්නේ
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
  backgroundColor: 'rgba(255,255,255,0.08)', // ටිකක් වැඩි කළා පේන්න
};

const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontWeight: 'bold',
  display: 'block',
  fontSize: '0.95rem'
};

export default Sidebar;