import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const [newDriver, setNewDriver] = useState({ 
        driverName: '', 
        vehicleType: '',   // Category (Car, Van, Tuk)
        vehicleModel: '',  // Model (Vezel Z 2025, etc.)
        isAvailable: true 
    });

    const fetchDrivers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/drivers/all');
            setDrivers(response.data);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };

    useEffect(() => { fetchDrivers(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/drivers/add', newDriver);
            Swal.fire({
                title: 'Success!',
                text: 'New driver profile has been created.',
                icon: 'success',
                confirmButtonColor: '#1a2a6c'
            });
            setNewDriver({ driverName: '', vehicleType: '', vehicleModel: '', isAvailable: true });
            fetchDrivers();
        } catch (error) {
            Swal.fire('Error', 'Something went wrong during registration.', 'error');
        }
    };

    const deleteDriver = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action will permanently remove the driver.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/api/drivers/delete/${id}`);
                Swal.fire('Deleted!', 'Driver has been removed.', 'success');
                fetchDrivers();
            } catch (error) {
                Swal.fire('Error', 'Failed to delete driver.', 'error');
            }
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Manage Drivers 🚕</h1>

            <div style={formCard}>
                <h3 style={{color: '#1a2a6c', marginBottom: '20px'}}>Register New Driver</h3>
                <form onSubmit={handleSubmit} style={{display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center'}}>
                    <input 
                        type="text" placeholder="Driver Name" style={inputStyle}
                        value={newDriver.driverName}
                        onChange={(e) => setNewDriver({...newDriver, driverName: e.target.value})}
                        required
                    />
                    
                    {/* Category Dropdown */}
                    <select 
                        style={inputStyle}
                        value={newDriver.vehicleType}
                        onChange={(e) => setNewDriver({...newDriver, vehicleType: e.target.value})}
                        required
                    >
                        <option value="">Vehicle Category</option>
                        <option value="Car">Car</option>
                        <option value="Van">Van</option>
                        <option value="Tuk Tuk">Tuk Tuk</option>
                        <option value="SUV">SUV</option>
                    </select>

                    {/* ✅ New Field: Vehicle Model (Ex: Vezel Z 2025) */}
                    <input 
                        type="text" placeholder="Vehicle Model " style={inputStyle}
                        value={newDriver.vehicleModel}
                        onChange={(e) => setNewDriver({...newDriver, vehicleModel: e.target.value})}
                        required
                    />
                    
                    <button type="submit" style={btnStyle}>Register</button>
                </form>
            </div>

            <div style={gridStyle}>
                {drivers.map(driver => (
                    <div key={driver.id} style={driverCard}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <h4 style={{margin: 0, color: '#1a2a6c'}}>{driver.driverName}</h4>
                            <span style={{
                                backgroundColor: driver.isAvailable ? '#d4edda' : '#f8d7da',
                                color: driver.isAvailable ? '#155724' : '#721c24',
                                padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold'
                            }}>
                                {driver.isAvailable ? 'Available' : 'Busy'}
                            </span>
                        </div>
                        <p style={{marginTop: '15px', marginBottom: '5px', color: '#555'}}>
                            Category: <b>{driver.vehicleType}</b>
                        </p>
                        {/* Display the Specific Model */}
                        <p style={{margin: '0 0 15px 0', color: '#1a2a6c', fontSize: '14px'}}>
                            Model: <b>{driver.vehicleModel || 'Standard'}</b>
                        </p>
                        
                        <button onClick={() => deleteDriver(driver.id)} style={deleteBtn}>
                            🗑️ Delete Driver
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Styles
const containerStyle = { padding: '20px' };
const titleStyle = { color: '#1a2a6c', borderBottom: '4px solid #f1c40f', display: 'inline-block', marginBottom: '30px', paddingBottom: '5px' };
const formCard = { background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #1a2a6c' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '2px solid #ddd', flex: '1', minWidth: '220px', fontSize: '15px', outline: 'none' };
const btnStyle = { background: '#1a2a6c', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' };
const driverCard = { background: '#fff', padding: '20px', borderRadius: '15px', borderTop: '6px solid #1a2a6c', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' };
const deleteBtn = { background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px', fontSize: '14px' };

export default DriverList;