'use client'

import { useState } from 'react'
import type { Product } from '@/lib/types'
import { formatCurrency } from '@/lib/formatters'
import FilterBar from '@/components/dashboard/FilterBar'
import Pagination from '@/components/ui/Pagination'

interface ProductTableProps {
  products: Product[]
}

type StatusFilter = 'all' | 'in_stock' | 'out_of_stock'
type SortOrder   = 'asc' | 'desc'

export default function ProductTable({ products }: ProductTableProps) {
  const [search,       setSearch]       = useState('')
  const [sortOrder,    setSortOrder]    = useState<SortOrder>('asc')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [category,     setCategory]     = useState('all')

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  const filtered = products
    .filter(p => p.name.includes(search))
    .filter(p => category === 'all' || p.category === category)
    .filter(p => {
      if (statusFilter === 'all') return true
      if (statusFilter === 'out_of_stock') return p.status === 'in_stock'
      return p.status === statusFilter
    })
    .sort((a, b) =>
      sortOrder === 'asc' ? b.price - a.price : a.price - b.price
    )

  const capitalizeStatus = (status: string) => {
    const labelMap: { [key: string]: string } = {
      'in_stock': 'In stock',
      'out_of_stock': 'Out of stock'
    }
    return labelMap[status] || status
  }

  return (
    <div>
      <div className="table-toolbar" style={{ marginBottom: 12 }}>
        <FilterBar
          categories={categories}
          onCategoryChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
          onStatusChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatusFilter(e.target.value as StatusFilter)}
        />
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value as SortOrder)}
          style={{ marginLeft: 'auto' }}
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      <div className="table-wrapper">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <p>No product found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td className="sku-cell">{p.sku}</td>
                  <td>{p.category}</td>
                  <td>{formatCurrency(p.price)}</td>
                  <td
                    className={`stock-cell ${
                      p.stock === 0 ? 'stock-zero' : p.stock < 10 ? 'stock-low' : ''
                    }`}
                  >
                    {p.stock}
                  </td>
                  <td>
                    <span className={`status-badge status-${p.status}`}>
                      {capitalizeStatus(p.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Pagination total={filtered.length} pageSize={8} />
      </div>
    </div>
  )
}