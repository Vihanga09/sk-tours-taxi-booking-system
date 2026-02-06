import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

/**
 * AdminHome Component
 * Provides a live system overview with tour analytics.
 * Fixed: Fully optimized for Light and Dark mode transitions.
 */
const AdminHome = ({ bookingCount }) => {
  const { isDarkMode } = useContext(ThemeContext);

  // Mock data for the Weekly Tour Analytics Chart
  const data = [
    { name: 'Mon', tours: 3 }, { name: 'Tue', tours: 6 }, { name: 'Wed', tours: 4 },
    { name: 'Thu', tours: 8 }, { name: 'Fri', tours: 10 }, { name: 'Sat', tours: 15 }, { name: 'Sun', tours: 19 },
  ];

  // ✅ Dynamic Colors based on Theme
  const cardBg = isDarkMode ? '#2d2d2d' : '#ffffff';
  const textColor = isDarkMode ? '#ecf0f1' : '#1a2a6c';
  const subTextColor = isDarkMode ? '#bdc3c7' : '#555';
  const gridColor = isDarkMode ? '#444' : '#eee';

  return (
    <div style={{ padding: '20px', transition: '0.3s' }}>
      
      {/* 🚩 Ayubowan Admin! Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #1a2a6c, #b21f1f, #fdbb2d)',
        padding: '30px',
        borderRadius: '20px',
        color: '#fff',
        marginBottom: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Ayubowan Admin! 🙏</h1>
        <p style={{ opacity: 0.9 }}>SK TOURS Control Panel - Live System Overview</p>
      </div>

      {/* 📊 Summary Cards Section */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <SummaryCard 
          icon="🚕" label="TOTAL TOURS" value={bookingCount || 19} 
          bg={cardBg} color={textColor} border="#1a2a6c" 
        />
        <SummaryCard 
          icon="👥" label="ACTIVE DRIVERS" value="Online" 
          bg={cardBg} color={textColor} border="#fdbb2d" 
        />
        <SummaryCard 
          icon="💰" label="TOTAL REVENUE" value="LKR 354,460" 
          bg={cardBg} color={textColor} border="#2ecc71" 
        />
      </div>

      {/* 📈 Chart Section (Fixed for Dark Mode) */}
      <div style={{
        backgroundColor: cardBg,
        padding: '30px',
        borderRadius: '20px',
        boxShadow: isDarkMode ? 'none' : '0 4px 20px rgba(0,0,0,0.05)',
        border: isDarkMode ? '1px solid #444' : 'none'
      }}>
        <h3 style={{ color: textColor, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          📈 Weekly Tour Analytics
        </h3>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a2a6c" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1a2a6c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" stroke={subTextColor} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
              <YAxis stroke={subTextColor} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1a1a1a' : '#fff', 
                  border: `1px solid ${gridColor}`,
                  borderRadius: '10px',
                  color: textColor
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="tours" 
                stroke="#1a2a6c" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorTours)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- Reusable Component for Summary Cards ---
const SummaryCard = ({ icon, label, value, bg, color, border }) => (
  <div style={{
    backgroundColor: bg,
    flex: 1,
    minWidth: '250px',
    padding: '25px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    borderLeft: `6px solid ${border}`,
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    transition: '0.3s'
  }}>
    <div style={{ fontSize: '30px' }}>{icon}</div>
    <div>
      <p style={{ margin: 0, fontSize: '0.8rem', color: '#888', fontWeight: 'bold' }}>{label}</p>
      <h2 style={{ margin: 0, color: color }}>{value}</h2>
    </div>
  </div>
);

export default AdminHome;