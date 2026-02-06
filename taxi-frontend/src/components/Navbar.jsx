import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext.jsx';

const Navbar = ({ toggleSidebar, userRole }) => {
  // ✅ Access global theme state from Context
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  /**
   * Handle user logout by clearing session data 
   * and redirecting to the login portal.
   */
  const handleLogout = () => {
    localStorage.removeItem('user'); 
    window.location.href = '/login'; 
  };

  return (
    <header style={{
      ...navStyle,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', // Deeper dark for better contrast
      borderBottom: isDarkMode ? '1px solid #333' : '1px solid #eee',
      boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Render the sidebar toggle button only for ADMIN users */}
        {userRole === 'ADMIN' && (
          <button onClick={toggleSidebar} style={{
            ...btnStyle,
            color: isDarkMode ? '#f1c40f' : '#1a2a6c'
          }}>☰</button>
        )}
        
        {/* Main Brand Logo - Navigation to Home */}
        <h3 style={{ 
          margin: 0, 
          color: isDarkMode ? '#fdbb2d' : '#1a2a6c',
          cursor: 'pointer',
          letterSpacing: '0.5px'
        }} onClick={() => navigate('/')}>🚕 SK TOURS</h3>
      </div>
      
      <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Quick access CTA for Customers to create a booking */}
        {userRole === 'CUSTOMER' && (
          <Link to="/new-booking" style={bookBtnStyle}>🚖 Book a Taxi</Link>
        )}

        {/* Dynamic Navigation Links with theme-aware colors */}
        <Link to="/about" style={{
          ...linkStyle,
          color: isDarkMode ? '#ecf0f1' : '#34495e'
        }}>About Us</Link>

        <Link to="/contact" style={{
          ...linkStyle,
          color: isDarkMode ? '#ecf0f1' : '#34495e'
        }}>Contact Us</Link>

        <Link to="/reviews" style={{
          ...linkStyle,
          color: isDarkMode ? '#ecf0f1' : '#34495e'
        }}>Reviews</Link>

        {/* Theme Toggle Button: Switches between Sun and Moon icons */}
        <button 
          onClick={toggleTheme} 
          style={{
            ...themeBtnStyle,
            backgroundColor: isDarkMode ? '#333' : '#f8f9fa',
            color: isDarkMode ? '#f1c40f' : '#2c3e50',
            border: isDarkMode ? '1px solid #444' : '1px solid #ddd'
          }}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        {/* Secure Logout CTA */}
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      </nav>
    </header>
  );
};

// --- STYLES (Modern UI Design for SLIIT IT23242104 Project) ---
const navStyle = { 
  padding: '12px 40px', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  transition: 'background-color 0.3s ease, border 0.3s ease',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const btnStyle = { fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer', transition: '0.2s' };
const linkStyle = { textDecoration: 'none', fontWeight: '600', fontSize: '14px', transition: 'color 0.2s' };

const bookBtnStyle = {
  backgroundColor: '#fdbb2d',
  color: '#000',
  padding: '10px 18px',
  borderRadius: '12px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '13px',
  boxShadow: '0 4px 10px rgba(253, 187, 45, 0.3)',
  transition: 'transform 0.2s ease, background-color 0.2s ease'
};

const logoutBtnStyle = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  padding: '9px 18px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '13px',
  transition: 'opacity 0.2s'
};

const themeBtnStyle = {
  padding: '8px 12px',
  borderRadius: '50%', // Rounder style for a more modern look
  cursor: 'pointer',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease'
};

export default Navbar;