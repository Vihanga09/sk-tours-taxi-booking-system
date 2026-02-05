import React, { useContext } from 'react'; // ✅ useContext ඇඩ් කළා
import { useNavigate } from 'react-router-dom';
import homeHero from '../assets/home-hero.jpg';
import { ThemeContext } from './ThemeContext.jsx'; // ✅ ThemeContext එක import කළා

const CustomerHome = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useContext(ThemeContext); // ✅ දැනට තියෙන theme එක ගත්තා

    // Dynamic styles based on theme
    const dynamicCardStyle = {
        ...featureCard,
        backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff', // Dark mode නම් තද අළු, නැත්නම් සුදු
        boxShadow: isDarkMode ? '0 5px 15px rgba(0,0,0,0.5)' : '0 5px 15px rgba(0,0,0,0.05)',
        color: isDarkMode ? '#ffffff' : '#333333' // පොදුවේ අකුරු වල පාට
    };

    const dynamicTitleStyle = {
        color: isDarkMode ? '#fdbb2d' : '#1a2a6c', // Title එක Dark mode එකේදී රන්වන් පාටට හැරෙනවා
        marginBottom: '10px'
    };

    const dynamicSubTitleStyle = {
        color: isDarkMode ? '#bbbbbb' : '#555555' // විස්තරය ලා අළු පාටට හැරෙනවා
    };

    return (
        <div style={containerStyle}>
            {/* Main Welcome Section */}
            <div style={{
                ...heroStyle,
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${homeHero})`
            }}>
                <h1 style={titleStyle}>Discover the Beauty of Sri Lanka 🇱🇰</h1>
                <p style={subtitleStyle}>Experience seamless travel with SK TOURS. Reliable rides for your next adventure.</p>
                <button 
                    style={bookBtnStyle} 
                    onClick={() => navigate('/new-booking')}
                >
                    🚖 Book Your Ride Now
                </button>
            </div>

            {/* Why Choose Us Section */}
            <div style={infoSectionStyle}>
                <h2 style={{ color: isDarkMode ? '#fdbb2d' : '#1a2a6c' }}>Why Travel With Us?</h2>
                <div style={featureGrid}>
                    <div style={dynamicCardStyle}>
                        <h3 style={dynamicTitleStyle}>Professional Drivers</h3>
                        <p style={dynamicSubTitleStyle}>Our drivers are experienced and know every corner of Sri Lanka.</p>
                    </div>
                    <div style={dynamicCardStyle}>
                        <h3 style={dynamicTitleStyle}>24/7 Support</h3>
                        <p style={dynamicSubTitleStyle}>We are always here to help you during your journey.</p>
                    </div>
                    <div style={dynamicCardStyle}>
                        <h3 style={dynamicTitleStyle}>Comfortable Fleet</h3>
                        <p style={dynamicSubTitleStyle}>Modern vehicles maintained to the highest safety standards.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- STYLES ---
const containerStyle = { width: '100%', textAlign: 'center' };
const heroStyle = {
    height: '450px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    color: '#fff',
    padding: '20px'
};
const titleStyle = { fontSize: '3rem', marginBottom: '10px', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' };
const subtitleStyle = { fontSize: '1.2rem', marginBottom: '30px', maxWidth: '600px' };
const bookBtnStyle = { 
    backgroundColor: '#fdbb2d', 
    color: '#000', 
    padding: '15px 35px', 
    border: 'none', 
    borderRadius: '30px', 
    fontSize: '1.2rem', 
    fontWeight: 'bold', 
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(253, 187, 45, 0.4)'
};
const infoSectionStyle = { marginTop: '50px', padding: '20px' };
const featureGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' };
const featureCard = { padding: '25px', borderRadius: '15px', borderBottom: '4px solid #fdbb2d', transition: '0.3s' };

export default CustomerHome;