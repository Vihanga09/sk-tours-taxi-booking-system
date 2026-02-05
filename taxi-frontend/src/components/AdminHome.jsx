import React, { useState, useEffect } from 'react'; // ✅ useState, useEffect ඇඩ් කළා
import axios from 'axios'; // ✅ axios ඇඩ් කළා
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminHome = ({ bookingCount }) => {
  // ✅ Backend එකෙන් එන Revenue එක store කරන්න state එකක්
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // ✅ Backend API එකෙන් real revenue එක fetch කරනවා
    axios.get('http://localhost:8080/api/bookings/revenue')
      .then(res => {
        setTotalRevenue(res.data);
      })
      .catch(err => console.log("Revenue Fetch Error: ", err));
  }, []);

  const data = [
    { name: 'Mon', bookings: 2 },
    { name: 'Tue', bookings: 5 },
    { name: 'Wed', bookings: 3 },
    { name: 'Thu', bookings: 8 },
    { name: 'Fri', bookings: 12 },
    { name: 'Sat', bookings: 10 },
    { name: 'Sun', bookings: bookingCount },
  ];

  return (
    <div style={containerStyle}>
      <div style={heroSection}>
        <div>
          <h1 style={titleStyle}>Ayubowan Admin! 🙏</h1>
          <p style={subtitleStyle}>SK TOURS Control Panel - Live System Overview</p>
        </div>
      </div>

      <div style={statsGrid}>
        <div style={statCard('#1a2a6c')}>
          <div style={iconStyle}>🚕</div>
          <div>
            <h2 style={cardTitle}>Total Tours</h2>
            <p style={cardValue}>{bookingCount}</p>
          </div>
        </div>

        <div style={statCard('#f1c40f')}>
          <div style={{...iconStyle, color: '#1a2a6c'}}>👥</div>
          <div>
            <h2 style={{...cardTitle, color: '#1a2a6c'}}>Active Drivers</h2>
            <p style={{...cardValue, color: '#1a2a6c'}}>Online</p>
          </div>
        </div>

        <div style={statCard('#27ae60')}>
          <div style={iconStyle}>💰</div>
          <div>
            {/* - Estimated නෙවෙයි දැන් Total Revenue */}
            <h2 style={cardTitle}>Total Revenue</h2>
            <p style={cardValue}>LKR {totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div style={chartContainer}>
        <h3 style={{ color: '#1a2a6c', marginBottom: '20px', fontWeight: 'bold' }}>📈 Weekly Tour Analytics</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a2a6c" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1a2a6c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" stroke="#7f8c8d" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#7f8c8d" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="bookings" stroke="#1a2a6c" strokeWidth={3} fillOpacity={1} fill="url(#colorBookings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// ... Styling Objects ...
const containerStyle = { padding: '10px', minHeight: '100vh', background: '#f4f7f6' };
const heroSection = { padding: '40px', marginBottom: '30px', background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)', borderRadius: '20px', color: '#fff' };
const titleStyle = { fontSize: '2.5rem', margin: 0, fontWeight: '800' };
const subtitleStyle = { fontSize: '1.1rem', opacity: 0.9, marginTop: '5px' };
const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' };
const statCard = (bgColor) => ({ backgroundColor: '#fff', padding: '25px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px', borderLeft: `8px solid ${bgColor}` });
const iconStyle = { fontSize: '2.5rem' };
const cardTitle = { margin: 0, fontSize: '0.9rem', color: '#7f8c8d', textTransform: 'uppercase' };
const cardValue = { margin: '5px 0 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: '#1a2a6c' };
const chartContainer = { backgroundColor: '#fff', padding: '30px', borderRadius: '20px' };

export default AdminHome;