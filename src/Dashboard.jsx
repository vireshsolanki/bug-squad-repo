import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setData({ users: 44, uptime: '99.9%' });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-card" style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>System Overview</h2>
      
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div className="stat-item">
          <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>TOTAL USERS</label>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data?.users}</div>
        </div>
        <div className="stat-item">
          <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>SYSTEM UPTIME</label>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data?.uptime || '---'}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;