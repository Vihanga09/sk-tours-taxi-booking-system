import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2
import loginBg from '../assets/login-bg.jpg';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CUSTOMER' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/users/register', formData);
            
            // ✅ Success SweetAlert
            Swal.fire({
                title: 'Registration Successful!',
                text: 'Your account has been created. Please login to continue.',
                icon: 'success',
                confirmButtonColor: '#fdbb2d',
            });

            navigate('/login'); 
        } catch (error) {
            // ❌ Error SweetAlert
            Swal.fire({
                title: 'Registration Failed!',
                text: error.response?.data || 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    };

    return (
        <div style={{...pageStyle, backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${loginBg})`}}>
            <div style={glassFormStyle}>
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

// Styles 
const pageStyle = { height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const glassFormStyle = { backdropFilter: 'blur(15px)', padding: '40px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.3)', width: '380px', textAlign: 'center', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' };
const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#ffffff', color: '#1a1a1a', fontSize: '16px' };
const btnStyle = { width: '100%', padding: '12px', backgroundColor: '#fdbb2d', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: '0.3s' };

export default Register;