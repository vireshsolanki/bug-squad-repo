import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
        {/* BUG #3: Hardcoded text instead of import.meta.env.VITE_APP_NAME */}
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>SQUAD_LEGACY</h1>
      </header>
      
      <div className="main-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '40px', alignItems: 'start' }}>
        <Login />
        
        <div className="dev-previews">
          <Dashboard />
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default App;
