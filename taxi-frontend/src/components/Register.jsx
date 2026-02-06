import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import loginBg from '../assets/login-bg.jpg';
import { ThemeContext } from './ThemeContext.jsx';

/**
 * Register Component
 * Implements secure role-based registration for SK TOURS.
 * Restricted Admin registration requires a secret key provided by the Main Admin.
 */
const Register = () => {
    // ✅ Added 'adminKey' to track the secret key for Admin registration
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CUSTOMER', adminKey: '' });
    const navigate = useNavigate();
    const { isDarkMode } = useContext(ThemeContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // ✅ Sends data to the backend for validation against the 'Kanchucka@2002' key
            await axios.post('http://localhost:8080/api/users/register', formData);
            
            Swal.fire({
                title: 'Registration Successful!',
                text: 'Your account has been created. Please login to continue.',
                icon: 'success',
                confirmButtonColor: '#fdbb2d',
            });

            navigate('/login'); 
        } catch (error) {
            Swal.fire({
                title: 'Registration Failed!',
                // ✅ Displays specific backend error (e.g., Invalid Admin Key)
                text: error.response?.data || 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    };

    return (
        <div style={{
            ...pageStyle, 
            backgroundImage: `linear-gradient(rgba(0,0,0,${isDarkMode ? '0.6' : '0.4'}), rgba(0,0,0,${isDarkMode ? '0.6' : '0.4'})), url(${loginBg})`
        }}>
            <div style={{
                ...glassFormStyle,
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.1)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'
            }}>
                <h2 style={{color: '#fff', marginBottom: '10px'}}>Create Account</h2>
                <p style={{color: '#ddd', fontSize: '14px', marginBottom: '20px'}}>Join SK TOURS Today</p>
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        style={inputStyle} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        style={inputStyle} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        style={inputStyle} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        required 
                    />

                    {/* ✅ Role Selection Dropdown */}
                    <select 
                        style={inputStyle} 
                        value={formData.role} 
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                        <option value="CUSTOMER">Register as Customer</option>
                        <option value="ADMIN">Register as Admin</option>
                    </select>

                    {/* ✅ Conditional Rendering: Only shows Admin Key field if ADMIN role is selected */}
                    {formData.role === 'ADMIN' && (
                        <input 
                            type="password" 
                            placeholder="Enter Master Secret Key" 
                            style={{...inputStyle, border: '2px solid #fdbb2d'}} 
                            onChange={(e) => setFormData({...formData, adminKey: e.target.value})} 
                            required 
                        />
                    )}

                    <button type="submit" style={btnStyle}>Register Now</button>
                </form>

                <p style={{color: '#fff', marginTop: '15px', fontSize: '14px'}}>
                    Already have an account? 
                    <span 
                        style={{color: '#fdbb2d', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5px'}} 
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

// --- STYLES ---
const pageStyle = { height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const glassFormStyle = { backdropFilter: 'blur(15px)', padding: '40px', borderRadius: '25px', border: '1px solid', width: '380px', textAlign: 'center', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', transition: 'all 0.3s ease' };
const inputStyle = { width: '100%', padding: '14px', margin: '10px 0', borderRadius: '12px', border: 'none', outline: 'none', backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#1a1a1a', fontSize: '15px', boxSizing: 'border-box' };
const btnStyle = { width: '100%', padding: '14px', backgroundColor: '#fdbb2d', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', fontSize: '16px', color: '#1a2a6c', transition: '0.3s' };

export default Register;