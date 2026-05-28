import productsData from '@/data/products.json'
import ProductTable from '@/components/dashboard/ProductTable'
import SearchBar from '@/components/dashboard/SearchBar'
import type { Product } from '@/lib/types'
import { useState } from 'react'

export default function ProductsPage() {
  const products = productsData as Product[]
  const [search, setSearch] = useState('')

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="table-toolbar">
        <SearchBar onSearch={setSearch} placeholder="Search products..." />
      </div>
      <ProductTable products={products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))} />
    </div>
  )
}