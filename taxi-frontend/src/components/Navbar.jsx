import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext.jsx'; // ✅ Fixed path: using './' because both are in the same folder

const Navbar = ({ toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header style={{
      ...navStyle,
      backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
      borderBottom: isDarkMode ? '1px solid #333' : '1px solid #ddd'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button onClick={toggleSidebar} style={{
          ...btnStyle,
          color: isDarkMode ? '#ffffff' : '#333333'
        }}>☰</button>
        
        <h3 style={{ 
          margin: 0, 
          color: isDarkMode ? '#fdbb2d' : '#1a2a6c' 
        }}>🚕 SK TOURS</h3>
      </div>
      
      <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* ✅ RESTORED LINKS: About Us & Contact Us */}
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

        {/* Dark Mode Toggle Switch */}
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
      </nav>
    </header>
  );
};

// --- STYLES ---
const navStyle = { 
  padding: '15px 30px', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  transition: 'all 0.3s ease' 
};

const btnStyle = { fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' };
const linkStyle = { textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' };
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