import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

/**
 * DriverList Component
 * Provides Admin functionality to register, view, and remove drivers.
 * Fully compatible with Light/Dark mode themes.
 */
const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({ name: '', category: '', model: '', status: 'Available' });

  // ✅ Check if Dark Mode is active for dynamic styling
  const isDark = document.body.getAttribute('data-theme') === 'dark';

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/drivers/all');
      setDrivers(response.data);
    } catch (error) {
      console.error("DEBUG: Backend unreachable", error);
    }
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/drivers/register', newDriver);
      Swal.fire('Registered', 'New driver added to SK TOURS fleet.', 'success');
      setNewDriver({ name: '', category: '', model: '', status: 'Available' });
      fetchDrivers();
    } catch (error) {
      Swal.fire('Error', 'Registration failed.', 'error');
    }
  };

  const deleteDriver = async (id) => {
    const result = await Swal.fire({
      title: 'Remove Driver?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/drivers/delete/${id}`);
        Swal.fire('Deleted!', 'Driver has been removed.', 'success');
        fetchDrivers();
      } catch (error) {
        Swal.fire('Error', 'Deletion failed.', 'error');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: isDark ? '#f1c40f' : '#1a2a6c', borderBottom: '3px solid #f1c40f', display: 'inline-block' }}>
        Manage Drivers 🚕
      </h1>

      {/* 📝 Registration Form Section */}
      <div style={{
        ...cardStyle,
        backgroundColor: isDark ? '#2d2d2d' : '#ffffff',
        border: isDark ? '1px solid #444' : '1px solid #eee',
        marginBottom: '30px',
        padding: '25px'
      }}>
        <h3 style={{ marginTop: 0, color: isDark ? '#ecf0f1' : '#333' }}>Register New Driver</h3>
        <form onSubmit={handleRegister} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Driver Name" 
            style={{...inputStyle, backgroundColor: isDark ? '#1a1a1a' : '#fff', color: isDark ? '#fff' : '#333', borderColor: isDark ? '#555' : '#ddd'}}
            value={newDriver.name}
            onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
            required
          />
          <select 
            style={{...inputStyle, backgroundColor: isDark ? '#1a1a1a' : '#fff', color: isDark ? '#fff' : '#333', borderColor: isDark ? '#555' : '#ddd'}}
            value={newDriver.category}
            onChange={(e) => setNewReview({...newDriver, category: e.target.value})}
            required
          >
            <option value="">Vehicle Category</option>
            <option value="Car">Car</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
          </select>
          <input 
            type="text" 
            placeholder="Vehicle Model" 
            style={{...inputStyle, backgroundColor: isDark ? '#1a1a1a' : '#fff', color: isDark ? '#fff' : '#333', borderColor: isDark ? '#555' : '#ddd'}}
            value={newDriver.model}
            onChange={(e) => setNewDriver({...newDriver, model: e.target.value})}
            required
          />
          <button type="submit" style={registerBtn}>Register</button>
        </form>
      </div>

      {/* 🗂️ Driver Fleet Display */}
      <div style={gridStyle}>
        {drivers.map((driver) => (
          <div key={driver.id} style={{
            ...cardStyle,
            backgroundColor: isDark ? '#262626' : '#ffffff',
            border: isDark ? '1px solid #333' : '1px solid #ddd',
            color: isDark ? '#ecf0f1' : '#333',
            transition: '0.3s'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, color: isDark ? '#f1c40f' : '#1a2a6c' }}>{driver.name}</h2>
              <span style={{ 
                padding: '4px 10px', 
                borderRadius: '20px', 
                fontSize: '0.8rem', 
                backgroundColor: driver.status === 'Busy' ? '#e74c3c22' : '#2ecc7122',
                color: driver.status === 'Busy' ? '#e74c3c' : '#2ecc71',
                fontWeight: 'bold'
              }}>
                {driver.status}
              </span>
            </div>
            <p style={{ margin: '15px 0 5px 0' }}>Category: <b>{driver.category}</b></p>
            <p style={{ margin: 0 }}>Model: <b>{driver.model}</b></p>
            <hr style={{ border: '0.5px solid', borderColor: isDark ? '#444' : '#eee', margin: '15px 0' }} />
            <button onClick={() => deleteDriver(driver.id)} style={deleteBtn}>🗑️ Delete Driver</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MODERN UI STYLES ---
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' };
const cardStyle = { padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid', flex: 1, minWidth: '150px' };
const registerBtn = { backgroundColor: '#1a2a6c', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const deleteBtn = { background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' };

export default DriverList;