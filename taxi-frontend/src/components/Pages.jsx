import React from 'react';
// 📸 Assets from your project folder
import aboutBg from '../assets/about-bg.jpg';   // Nine Arch Bridge
import contactBg from '../assets/contact-bg.jpg'; // Galle Fort

/**
 * --- 1. About Us Page ---
 * A sleek, professional business description focusing on premium 
 * travel services without any academic or module references.
 */
export const AboutUs = () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';

  return (
    <div style={{...containerStyle, backgroundColor: isDark ? '#1e1e1e' : '#ffffff'}}>
      {/* Visual Header featuring Sri Lankan scenery */}
      <img 
        src={aboutBg} 
        alt="Nine Arch Bridge Sri Lanka" 
        style={heroImageStyle} 
      />
      <h1 style={{...titleStyle, color: isDark ? '#f1c40f' : '#1a2a6c'}}>
        Discover Sri Lanka with SK TOURS 🚕
      </h1>
      <div style={contentWrapper}>
        <p style={{...textStyle, color: isDark ? '#ecf0f1' : '#34495e'}}>
          Welcome to <b>SK TOURS</b>, Sri Lanka’s leading premium ride-sharing and tourism management platform. 
          We are dedicated to redefining travel by providing a seamless bridge between adventurous explorers 
          and professional local guides. Whether it's the misty hills of Ella or the historic forts of Galle, 
          we ensure your journey is safe, comfortable, and truly unforgettable.
        </p>

        <h3 style={{color: isDark ? '#f1c40f' : '#1a2a6c', marginTop: '30px'}}>Why Choose Us?</h3>
        <p style={{...textStyle, color: isDark ? '#ecf0f1' : '#34495e'}}>
          In a fast-paced world, we combine <b>cutting-edge technology</b> with <b>authentic Sri Lankan hospitality</b>. 
          Our platform empowers local communities while offering travelers 100% transparency, real-time booking, 
          and vetted professional service. At SK TOURS, we don't just provide a ride; we provide a gateway 
          to the heart of the pearl of the Indian Ocean.
        </p>
      </div>
    </div>
  );
};

/**
 * --- 2. Contact Us Page ---
 * Provides admin contact details and a direct inquiry form for customers.
 */
export const ContactUs = () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';

  return (
    <div style={{...containerStyle, backgroundColor: isDark ? '#1e1e1e' : '#ffffff'}}>
      <h1 style={{...titleStyle, color: isDark ? '#f1c40f' : '#1a2a6c'}}>Contact Us 📞</h1>
      <img 
        src={contactBg} 
        alt="Galle Fort Sri Lanka" 
        style={{...heroImageStyle, height: '250px'}} 
      />
      <div style={gridStyle}>
        {/* Contact Info Card */}
        <div style={{...infoCard, backgroundColor: isDark ? '#2d2d2d' : '#f8f9fa', borderLeftColor: isDark ? '#f1c40f' : '#1a2a6c'}}>
          <h3 style={{...cardHeadingStyle, color: isDark ? '#f1c40f' : '#1a2a6c'}}>Admin Support</h3>
          <p style={{...cardSubTextStyle, color: isDark ? '#bdc3c7' : '#555'}}>For system issues or driver registration, reach out to our team:</p>
          <ul style={{...listStyle, color: isDark ? '#ecf0f1' : '#2c3e50'}}>
            <li>📍 <b style={{color: isDark ? '#f1c40f' : '#1a2a6c'}}>Location:</b> SLIIT Campus, Malabe</li>
            <li>📧 <b style={{color: isDark ? '#f1c40f' : '#1a2a6c'}}>Email:</b> support@sktours.lk</li>
            <li>📱 <b style={{color: isDark ? '#f1c40f' : '#1a2a6c'}}>Hotline:</b> +94 11 234 5678</li>
          </ul>
        </div>
        
        {/* Interactive Inquiry Form */}
        <div style={{...infoCard, backgroundColor: isDark ? '#2d2d2d' : '#f8f9fa', borderLeftColor: isDark ? '#f1c40f' : '#1a2a6c'}}>
          <h3 style={{...cardHeadingStyle, color: isDark ? '#f1c40f' : '#1a2a6c'}}>Inquiry Form</h3>
          <p style={{...cardSubTextStyle, color: isDark ? '#bdc3c7' : '#555'}}>Drop your message here:</p>
          <input 
            type="text" 
            placeholder="Your Name" 
            style={{...inputFix, backgroundColor: isDark ? '#1a1a1a' : '#fff', color: isDark ? '#fff' : '#000', borderColor: isDark ? '#444' : '#ddd'}} 
          />
          <textarea 
            placeholder="Message" 
            style={{...inputFix, height: '100px', resize: 'none', backgroundColor: isDark ? '#1a1a1a' : '#fff', color: isDark ? '#fff' : '#000', borderColor: isDark ? '#444' : '#ddd'}}
          ></textarea>
          <button style={{...btnStyle, backgroundColor: isDark ? '#f1c40f' : '#1a2a6c', color: isDark ? '#000' : '#fff'}}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

// --- REUSABLE STYLES ---
const heroImageStyle = { width: '100%', height: '350px', objectFit: 'cover', borderRadius: '15px', marginBottom: '25px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' };
const containerStyle = { padding: '40px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' };
const titleStyle = { marginBottom: '25px', borderBottom: '3px solid #f1c40f', display: 'inline-block', paddingBottom: '5px' };
const contentWrapper = { textAlign: 'left', lineHeight: '1.8' };
const textStyle = { fontSize: '1.1rem' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' };
const infoCard = { padding: '25px', borderRadius: '15px', borderLeft: '6px solid' };
const cardHeadingStyle = { marginTop: 0, marginBottom: '10px' };
const cardSubTextStyle = { fontSize: '0.95rem', marginBottom: '15px' };
const listStyle = { listStyle: 'none', padding: 0, lineHeight: '2.5' };
const inputFix = { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '2px solid', fontSize: '15px', boxSizing: 'border-box', outline: 'none' };
const btnStyle = { border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '16px', transition: '0.3s' };

export default AboutUs;