import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  return (
    <header style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button onClick={toggleSidebar} style={hamburgerBtnStyle}>☰</button>
        <h3 style={{ margin: 0, color: '#1a2a6c', letterSpacing: '1px' }}>🚕 SK TOURS</h3>
      </div>
      
      <nav style={navLinksStyle}>
        <Link to="/about" style={topLinkStyle}>About Us</Link>
        <Link to="/contact" style={topLinkStyle}>Contact Us</Link>
        <Link to="/reviews" style={topLinkStyle}>Reviews</Link>
      </nav>
    </header>
  );
};

// --- STYLES ---
const headerStyle = { 
  backgroundColor: '#fff', padding: '15px 40px', borderBottom: '1px solid #ddd', 
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
  position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
};
const hamburgerBtnStyle = { fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#1a2a6c' };
const navLinksStyle = { display: 'flex', gap: '25px' };
const topLinkStyle = { textDecoration: 'none', color: '#34495e', fontWeight: '600', fontSize: '0.9rem', transition: '0.3s' };

export default Header;