import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Sidebar Component
 * Provides navigation links for the Admin/User dashboard.
 * Features role-based visibility to restrict booking access for Admins.
 */
const Sidebar = ({ isOpen, userRole }) => { // ✅ Added userRole as a prop
  const location = useLocation();

  // Helper function to check if a navigation link is currently active
  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      ...sidebarStyle,
      left: isOpen ? '0' : '-260px', 
    }}>
      {/* Sidebar Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#f1c40f', margin: 0, letterSpacing: '1px' }}>SK ADMIN</h2>
        <small style={{ color: '#bdc3c7', textTransform: 'uppercase', fontSize: '10px' }}>
          Taxi Management System
        </small>
      </div>
      
      <hr style={{ borderColor: 'rgba(255,255,255,0.1)', marginBottom: '20px' }} />
      
      {/* Navigation Links List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {/* Dashboard Home Link */}
        <li style={{
          ...navItem, 
          backgroundColor: isActive('/') ? '#f1c40f' : 'transparent',
          boxShadow: isActive('/') ? '0 4px 10px rgba(0,0,0,0.2)' : 'none'
        }}>
          <Link to="/" style={{...linkStyle, color: isActive('/') ? '#1a2a6c' : '#ecf0f1'}}>
            🏠 Dashboard Home
          </Link>
        </li>
        
        {/* ✅ FEATURE: Role-based Filtering 
            The "New Booking" link is now ONLY visible to CUSTOMER roles.
        */}
        {userRole === 'CUSTOMER' && (
          <li style={{
            ...navItem, 
            backgroundColor: isActive('/new-booking') ? '#f1c40f' : 'transparent',
            boxShadow: isActive('/new-booking') ? '0 4px 10px rgba(0,0,0,0.2)' : 'none'
          }}>
            <Link to="/new-booking" style={{...linkStyle, color: isActive('/new-booking') ? '#1a2a6c' : '#ecf0f1'}}>
              🚖 New Booking
            </Link>
          </li>
        )}
        
        {/* Booking Management Link */}
        <li style={{
          ...navItem, 
          backgroundColor: isActive('/bookings') ? '#f1c40f' : 'transparent',
          boxShadow: isActive('/bookings') ? '0 4px 10px rgba(0,0,0,0.2)' : 'none'
        }}>
          <Link to="/bookings" style={{...linkStyle, color: isActive('/bookings') ? '#1a2a6c' : '#ecf0f1'}}>
            📊 Manage Bookings
          </Link>
        </li>
        
        {/* Drivers List Link */}
        <li style={{
          ...navItem, 
          backgroundColor: isActive('/drivers') ? '#f1c40f' : 'transparent',
          boxShadow: isActive('/drivers') ? '0 4px 10px rgba(0,0,0,0.2)' : 'none'
        }}>
          <Link to="/drivers" style={{...linkStyle, color: isActive('/drivers') ? '#1a2a6c' : '#ecf0f1'}}>
            👤 Drivers List
          </Link>
        </li>

        {/* Customer Feedback/Reviews Link */}
        <li style={{
          ...navItem, 
          backgroundColor: isActive('/reviews') ? '#f1c40f' : 'transparent',
          boxShadow: isActive('/reviews') ? '0 4px 10px rgba(0,0,0,0.2)' : 'none'
        }}>
          <Link to="/reviews" style={{...linkStyle, color: isActive('/reviews') ? '#1a2a6c' : '#ecf0f1'}}>
            ⭐ Customer Reviews
          </Link>
        </li>
      </ul>

      {/* Visual hint when Sidebar is collapsed */}
      {!isOpen && (
        <div style={{ 
          position: 'fixed', 
          left: '10px', 
          top: '80px', 
          color: '#1a2a6c', 
          fontWeight: 'bold',
          animation: 'pulse 2s infinite' 
        }}>
          Menu ⮕
        </div>
      )}
    </div>
  );
};

// --- STYLES ---
const sidebarStyle = {
  width: '260px',
  backgroundColor: '#1a2a6c',
  color: '#fff',
  padding: '30px 20px',
  height: '100vh',
  position: 'fixed',
  top: 0,
  transition: 'left 0.4s cubic-bezier(0.075, 0.82, 0.165, 1)',
  boxShadow: '4px 0 15px rgba(0,0,0,0.3)',
  zIndex: 1000,
  boxSizing: 'border-box'
};

const navItem = { padding: '14px 18px', borderRadius: '10px', marginBottom: '12px', transition: 'all 0.3s ease', cursor: 'pointer' };
const linkStyle = { textDecoration: 'none', fontWeight: '600', display: 'block', fontSize: '0.9rem', transition: 'color 0.3s ease' };

export default Sidebar;