import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext.jsx';

const Navbar = ({ toggleSidebar, userRole }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  /**
   * Clears user session from localStorage and 
   * redirects the user back to the login page.
   */
  const handleLogout = () => {
    localStorage.removeItem('user'); 
    window.location.href = '/login'; 
  };

  return (
    <header style={{
      ...navStyle,
      backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
      borderBottom: isDarkMode ? '1px solid #333' : '1px solid #ddd'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Render Sidebar toggle button only if the logged-in user is an ADMIN */}
        {userRole === 'ADMIN' && (
          <button onClick={toggleSidebar} style={{
            ...btnStyle,
            color: isDarkMode ? '#ffffff' : '#333333'
          }}>☰</button>
        )}
        
        <h3 style={{ 
          margin: 0, 
          color: isDarkMode ? '#fdbb2d' : '#1a2a6c',
          cursor: 'pointer' 
        }} onClick={() => navigate('/')}>🚕 SK TOURS</h3>
      </div>
      
      <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Call-to-Action button for CUSTOMERS to quickly access the booking form */}
        {userRole === 'CUSTOMER' && (
          <Link to="/new-booking" style={bookBtnStyle}>🚖 Book a Taxi</Link>
        )}

        {/* Standard Navigation Links */}
        <Link to="/about" style={{
          ...linkStyle,
          color: isDarkMode ? '#ffffff' : '#333'
        }}>About Us</Link>

        <Link to="/contact" style={{
          ...linkStyle,
          color: isDarkMode ? '#ffffff' : '#333'
        }}>Contact Us</Link>

        <Link to="/reviews" style={{
          ...linkStyle,
          color: isDarkMode ? '#ffffff' : '#333'
        }}>Reviews</Link>

        {/* Toggle between Light and Dark themes */}
        <button 
          onClick={toggleTheme} 
          style={{
            ...themeBtnStyle,
            backgroundColor: isDarkMode ? '#444' : '#f4f4f4',
            color: isDarkMode ? '#f1c40f' : '#2c3e50'
          }}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        {/* Log out button to end the current session */}
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      </nav>
    </header>
  );
};

// --- STYLES (Inline CSS for rapid prototyping) ---
const navStyle = { 
  padding: '10px 30px', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  transition: 'all 0.3s ease',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const btnStyle = { fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' };
const linkStyle = { textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' };

const bookBtnStyle = {
  backgroundColor: '#fdbb2d',
  color: '#000',
  padding: '8px 16px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '14px',
  boxShadow: '0 4px 10px rgba(253, 187, 45, 0.3)',
  transition: 'transform 0.2s ease'
};

const logoutBtnStyle = {
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '13px'
};

const themeBtnStyle = {
  border: 'none',
  padding: '8px 12px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};

export default Navbar;