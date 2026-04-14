import React, { useState } from 'react';

const ProductList = () => {
  const [search, setSearch] = useState('');
  const products = [
    { id: 1, name: 'Apple iPhone 15' },
    { id: 2, name: 'Samsung Galaxy S24' },
    { id: 3, name: 'Google Pixel 8' },
    { id: 4, name: 'MacBook Pro M3' }
  ];

  // BUG #1: Case-sensitive search. 'apple' won't match 'Apple'
  const filteredProducts = products.filter(p => p.name.includes(search));

  return (
    <div className="product-list" style={{ marginTop: '20px' }}>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <ul>
        {filteredProducts.map(p => (
          <li key={p.id} style={{ listStyle: 'none', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
