'use client'
import productsData from '@/data/products.json'
import ProductTable from '@/components/dashboard/ProductTable'
import SearchBar from '@/components/dashboard/SearchBar'
import type { Product } from '@/lib/types'
import { useState } from 'react'

export default function ProductsPage() {
  const products = productsData as Product[]
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="table-toolbar">
        <SearchBar onSearch={setSearchTerm} placeholder="Search products..." />
      </div>
      <ProductTable products={filteredProducts} />
    </div>
  )
}