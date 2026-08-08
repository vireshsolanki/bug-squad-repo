'use client'
import { useState } from 'react'
import productsData from '@/data/products.json'
import ProductTable from '@/components/dashboard/ProductTable'
import SearchBar from '@/components/dashboard/SearchBar'
import type { Product } from '@/lib/types'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const products = productsData as Product[]
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase())
  })


  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="table-toolbar">
        <SearchBar onSearch={(query) => setSearchQuery(query)} placeholder="Search products..." />
      </div>
      <ProductTable products={filteredProducts} />
    </div>
  )
}
