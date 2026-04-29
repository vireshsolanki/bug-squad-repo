'use client'

interface FilterBarProps {
  categories: string[]
  onCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FilterBar({ categories, onCategoryChange, onStatusChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <select onChange={onCategoryChange}>
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat === 'all' ? 'All Categories' : cat}
          </option>
        ))}
      </select>

      <select onChange={onStatusChange}>
        <option value="all">All Status</option>
        <option value="in_stock">In Stock</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>
    </div>
  )
}
