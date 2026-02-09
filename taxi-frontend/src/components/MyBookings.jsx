import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
    const [myBookings, setMyBookings] = useState([]);
    const navigate = useNavigate();
    const isDark = document.body.getAttribute('data-theme') === 'dark';

    useEffect(() => {
        // Fetch all bookings (Later we can filter this by logged-in user ID)
        axios.get('http://localhost:8080/api/bookings/all')
            .then(res => setMyBookings(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div style={{ padding: '30px', color: isDark ? '#fff' : '#333' }}>
            <h2>📅 My Booking History</h2>
            <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
                {myBookings.map(b => (
                    <div key={b.id} style={{
                        padding: '15px', borderRadius: '10px', 
                        backgroundColor: isDark ? '#1e1e1e' : '#fff',
                        border: `1px solid ${isDark ? '#333' : '#eee'}`,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <div>
                            <p style={{ margin: 0, fontWeight: 'bold' }}>To: {b.destination}</p>
                            <small style={{ color: '#888' }}>Date: {new Date(b.bookingTime).toLocaleDateString()}</small>
                        </div>
                        <button 
                            onClick={() => navigate(`/booking-receipt/${b.id}`)}
                            style={{ padding: '8px 15px', backgroundColor: '#f1c40f', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            View Receipt
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
