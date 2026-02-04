import React from 'react';

// --- 1. About Us Page ---
export const AboutUs = () => (
  <div style={containerStyle}>
    <h1 style={titleStyle}>About SK TOURS 🚕</h1>
    <div style={contentWrapper}>
      <p style={textStyle}>
        SK TOURS is a premium ride-sharing and tourist management platform developed for the <b>IT23242104</b> module at <b>SLIIT</b>. 
        We specialize in connecting tourists with professional local guides and reliable drivers to explore the beauty of Sri Lanka.
      </p>
      <h3 style={{color: '#1a2a6c', marginTop: '20px'}}>Our Mission</h3>
      <p style={textStyle}>
        To provide a seamless, safe, and transparent booking experience for international and local travelers while empowering local drivers.
      </p>
    </div>
  </div>
);

// --- 2. Contact Us Page ---
export const ContactUs = () => (
  <div style={containerStyle}>
    <h1 style={titleStyle}>Contact Us 📞</h1>
    <div style={gridStyle}>
      <div style={infoCard}>
        <h3 style={cardHeadingStyle}>Admin Support</h3>
        <p style={cardSubTextStyle}>For system issues or driver registration, reach out to our team:</p>
        <ul style={listStyle}>
          <li>📍 <b style={{color: '#1a2a6c'}}>Location:</b> SLIIT Campus, Malabe</li>
          <li>📧 <b style={{color: '#1a2a6c'}}>Email:</b> support@sktours.lk</li>
          <li>📱 <b style={{color: '#1a2a6c'}}>Hotline:</b> +94 11 234 5678</li>
        </ul>
      </div>
      
      <div style={infoCard}>
        <h3 style={cardHeadingStyle}>Inquiry Form</h3>
        <p style={cardSubTextStyle}>Drop your message here:</p>
        <input type="text" placeholder="Your Name" style={inputFix} />
        <textarea placeholder="Message" style={{...inputFix, height: '100px', resize: 'none'}}></textarea>
        <button style={btnStyle}>Send Message</button>
      </div>
    </div>
  </div>
);

// --- CSS STYLES ---
const containerStyle = { padding: '40px', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', animation: 'fadeIn 0.5s ease-in' };
const titleStyle = { color: '#1a2a6c', marginBottom: '25px', borderBottom: '3px solid #f1c40f', display: 'inline-block', paddingBottom: '5px' };
const contentWrapper = { textAlign: 'left', lineHeight: '1.8' };
const textStyle = { color: '#34495e', fontSize: '1.1rem' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' };
const infoCard = { padding: '25px', backgroundColor: '#f8f9fa', borderRadius: '15px', borderLeft: '6px solid #1a2a6c' };
const cardHeadingStyle = { color: '#1a2a6c', marginTop: 0, marginBottom: '10px' };
const cardSubTextStyle = { color: '#555555', fontSize: '0.95rem', marginBottom: '15px' };
const listStyle = { listStyle: 'none', padding: 0, color: '#2c3e50', lineHeight: '2.5' };
const inputFix = { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '2px solid #ddd', backgroundColor: '#ffffff', color: '#000000', fontSize: '15px', boxSizing: 'border-box', outline: 'none' };
const btnStyle = { backgroundColor: '#1a2a6c', color: '#ffffff', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '16px' };

export default AboutUs;