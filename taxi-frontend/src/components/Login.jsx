import React, { useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext.jsx'; // Context path එක check කරගන්න
import loginBg from '../assets/login-bg.jpg'; // සීගිරිය photo එක

const Login = ({ onLogin }) => {
    const { isDarkMode } = useContext(ThemeContext);
    const [userType, setUserType] = useState('customer'); // 'customer' or 'admin'

    const handleLoginAction = (e) => {
        e.preventDefault();
        onLogin(); // Tell App.jsx that the user has successfully logged in
    };

    return (
        <div style={{
            ...loginPageStyle,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${loginBg})`
        }}>
            <div style={{
                ...glassFormStyle,
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.2)',
            }}>
                <h2 style={{ color: '#fff', marginBottom: '5px' }}>🚕 SK TOURS</h2>
                <p style={{ color: '#ddd', fontSize: '14px' }}>Sri Lankan Premier Taxi Service</p>

                {/* Switch between Admin and Customer */}
                <div style={tabContainerStyle}>
                    <button onClick={() => setUserType('customer')} style={userType === 'customer' ? activeTabStyle : tabStyle}>Customer</button>
                    <button onClick={() => setUserType('admin')} style={userType === 'admin' ? activeTabStyle : tabStyle}>Admin</button>
                </div>

                <form onSubmit={handleLoginAction} style={{ marginTop: '20px' }}>
                    <input 
                        type="text" 
                        placeholder={userType === 'admin' ? "Admin Username" : "Your Name"} 
                        style={inputStyle} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        style={inputStyle} 
                        required 
                    />
                    <button type="submit" style={btnStyle}>
                        Login as {userType === 'admin' ? 'Admin' : 'Customer'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- STYLES ---
const loginPageStyle = {
    height: '100vh',
    width: '100vw',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2000 
};

const glassFormStyle = {
    backdropFilter: 'blur(15px)',
    padding: '40px',
    borderRadius: '25px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    width: '380px',
    textAlign: 'center'
};

const inputStyle = { 
    width: '100%', 
    padding: '12px', 
    margin: '10px 0', 
    borderRadius: '10px', 
    border: 'none', 
    outline: 'none',
    backgroundColor: '#ffffff', // Input එක ඇතුළ සුදු පාට කළා
    color: '#1a1a1a', // ටයිප් කරන අකුරු තද කළු පාට කළා
    fontSize: '16px',
    fontWeight: '500'
};

const tabContainerStyle = { display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' };
const tabStyle = { background: 'none', border: '1px solid #fff', color: '#fff', padding: '5px 15px', borderRadius: '15px', cursor: 'pointer', transition: '0.3s' };
const activeTabStyle = { ...tabStyle, background: '#fdbb2d', color: '#000', border: 'none' };
const btnStyle = { width: '100%', padding: '12px', backgroundColor: '#fdbb2d', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };

export default Login;