import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingReceipt = () => {
    const { id } = useParams(); // booking id get in url path
    const [booking, setBooking] = useState(null);
    const navigate = useNavigate();
    const isDark = document.body.getAttribute('data-theme') === 'dark';

    useEffect(() => {
        // Backend details get by booking id
        axios.get(`http://localhost:8080/api/bookings/${id}`)
            .then(res => setBooking(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!booking) return <div style={{textAlign:'center', marginTop:'50px'}}>Loading Receipt...</div>;

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', backgroundColor: isDark ? '#1e1e1e' : '#fff', color: isDark ? '#fff' : '#333', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', border: '1px solid #eee' }}>
            <h2 style={{textAlign: 'center', color: '#f1c40f'}}>🚖 SK TOURS RECEIPT</h2>
            <hr />
            <p><b>Booking ID:</b> #{booking.id}</p>
            <p><b>Customer:</b> {booking.passenger.name}</p>
            <p><b>Driver:</b> {booking.driver.driverName}</p>
            <p><b>From:</b> {booking.pickupLocation} <b>To:</b> {booking.destination}</p>
            <div style={{ marginTop: '20px', padding: '15px', textAlign: 'center', backgroundColor: '#f1c40f', color: '#000', borderRadius: '10px' }}>
                <h3 style={{margin: 0}}>Total Fare: LKR {booking.totalFare}.00</h3>
            </div>
            <button onClick={() => navigate('/')} style={{marginTop: '20px', width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#1a2a6c', color: '#fff', border: 'none', borderRadius: '5px'}}>Back to Home</button>
        </div>
    );
};

export default BookingReceipt;
