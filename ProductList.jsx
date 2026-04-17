import React, { useState } from 'react';

const products = [
  { name: 'Apple iPhone 15' },
  { name: 'Samsung Galaxy S22' },
];

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={e => setSearchQuery(e.target.value)} 
        placeholder="Search products"
      />
      <ul>
        {filteredProducts.map(product => (
          <li key={product.name}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;