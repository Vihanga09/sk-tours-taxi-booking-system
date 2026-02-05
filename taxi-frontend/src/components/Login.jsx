import React, { useContext, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2
import { ThemeContext } from './ThemeContext.jsx'; 
import loginBg from '../assets/login-bg.jpg'; 

const Login = ({ onLogin }) => {
    const { isDarkMode } = useContext(ThemeContext);
    const [userType, setUserType] = useState('customer');
    const navigate = useNavigate();

    // Login form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginAction = async (e) => {
        e.preventDefault();
        
        try {
            // Spring Boot Backend request
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                console.log("Login Success:", response.data);
                
                // Store user data
                localStorage.setItem('user', JSON.stringify(response.data));
                
                // ✅ Success SweetAlert
                Swal.fire({
                    title: 'Welcome Back!',
                    text: `Hello ${response.data.name}, login successful!`,
                    icon: 'success',
                    confirmButtonColor: '#fdbb2d',
                    timer: 2000,
                    showConfirmButton: false
                });

                onLogin(); 
                navigate('/'); // Redirect to home page after login
            }
        } catch (error) {
            console.error("Login Error:", error);
            
            // ❌ Error SweetAlert
            Swal.fire({
                title: 'Login Failed!',
                text: 'Invalid email or password. Please try again.',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
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

                <div style={tabContainerStyle}>
                    <button type="button" onClick={() => setUserType('customer')} style={userType === 'customer' ? activeTabStyle : tabStyle}>Customer</button>
                    <button type="button" onClick={() => setUserType('admin')} style={userType === 'admin' ? activeTabStyle : tabStyle}>Admin</button>
                </div>

                <form onSubmit={handleLoginAction} style={{ marginTop: '20px' }}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle} 
                        required 
                    />
                    <button type="submit" style={btnStyle}>
                        Login as {userType === 'admin' ? 'Admin' : 'Customer'}
                    </button>
                </form>

                <p style={{ color: '#fff', marginTop: '15px', fontSize: '14px' }}>
                    Don't have an account? 
                    <span 
                        style={{ color: '#fdbb2d', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5px' }}
                        onClick={() => navigate('/register')}
                    >
                        Register Here
                    </span>
                </p>
            </div>
        </div>
    );
};

// --- STYLES  ---
const loginPageStyle = { height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, zIndex: 2000 };
const glassFormStyle = { backdropFilter: 'blur(15px)', padding: '40px', borderRadius: '25px', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', width: '380px', textAlign: 'center' };
const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#ffffff', color: '#1a1a1a', fontSize: '16px', fontWeight: '500' };
const tabContainerStyle = { display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' };
const tabStyle = { background: 'none', border: '1px solid #fff', color: '#fff', padding: '5px 15px', borderRadius: '15px', cursor: 'pointer', transition: '0.3s' };
const activeTabStyle = { ...tabStyle, background: '#fdbb2d', color: '#000', border: 'none' };
const btnStyle = { width: '100%', padding: '12px', backgroundColor: '#fdbb2d', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };

export default Login;