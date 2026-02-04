import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Sidebar එක open/close කරන්න මේ බට්න් එක ඕනේ */}
        <button onClick={toggleSidebar} style={btnStyle}>☰</button>
        <h3 style={{ margin: 0, color: '#1a2a6c' }}>🚕 SK TOURS</h3>
      </div>
      
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link to="/about" style={linkStyle}>About Us</Link>
        <Link to="/contact" style={linkStyle}>Contact Us</Link>
        <Link to="/reviews" style={linkStyle}>Reviews</Link>
      </nav>
    </header>
  );
};

const navStyle = { 
  backgroundColor: '#fff', padding: '15px 30px', borderBottom: '1px solid #ddd', 
  display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
};
const btnStyle = { fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' };
const linkStyle = { textDecoration: 'none', color: '#333', fontWeight: 'bold', fontSize: '14px' };

export default Navbar;