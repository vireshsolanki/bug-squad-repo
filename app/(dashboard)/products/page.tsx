'use client'
import { useState } from 'react'
import productsData from '@/data/products.json'
import ProductTable from '@/components/dashboard/ProductTable'
import SearchBar from '@/components/dashboard/SearchBar'
import type { Product } from '@/lib/types'

export default function ProductsPage() {
  const products = productsData as Product[]
  const [search, setSearch] = useState('')

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="table-toolbar">
        <SearchBar onSearch={setSearch} placeholder="Search products..." />
      </div>
      <ProductTable products={filteredProducts} />
    </div>
  )
}