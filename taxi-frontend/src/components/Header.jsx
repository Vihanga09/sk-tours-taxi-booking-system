import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  // ✅ Detect if Dark Mode is active
  const isDark = document.body.getAttribute('data-theme') === 'dark';

  // --- DYNAMIC STYLES BASED ON THEME ---
  const dynamicHeader = {
    ...headerStyle,
    backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
    borderColor: isDark ? '#333333' : '#dddddd',
    boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.05)'
  };

  const dynamicTitle = {
    margin: 0, 
    color: isDark ? '#f1c40f' : '#1a2a6c', // Yellow for Dark, Deep Blue for Light
    letterSpacing: '1px'
  };

  const dynamicHamburger = {
    ...hamburgerBtnStyle,
    color: isDark ? '#ffffff' : '#1a2a6c'
  };

  const dynamicNavLink = (isActive) => ({
    ...topLinkStyle,
    color: isDark ? '#ecf0f1' : '#34495e'
  });

  return (
    <header style={dynamicHeader}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Toggle Sidebar Button */}
        <button onClick={toggleSidebar} style={dynamicHamburger}>☰</button>
        <h3 style={dynamicTitle}>🚕 SK TOURS</h3>
      </div>
      
      {/* Navigation Links Section */}
      <nav style={navLinksStyle}>
        <Link to="/about" style={dynamicNavLink()}>About Us</Link>
        <Link to="/contact" style={dynamicNavLink()}>Contact Us</Link>
        <Link to="/reviews" style={dynamicNavLink()}>Reviews</Link>
      </nav>
    </header>
  );
};

// --- STATIC STYLES ---
const headerStyle = { 
  padding: '15px 40px', 
  borderBottom: '1px solid', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  position: 'sticky', 
  top: 0, 
  zIndex: 100
};

const hamburgerBtnStyle = { 
  fontSize: '24px', 
  background: 'none', 
  border: 'none', 
  cursor: 'pointer' 
};

const navLinksStyle = { 
  display: 'flex', 
  gap: '25px' 
};

const topLinkStyle = { 
  textDecoration: 'none', 
  fontWeight: '600', 
  fontSize: '0.9rem', 
  transition: '0.3s' 
};

export default Header;