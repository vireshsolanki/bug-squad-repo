'use client'

interface FilterBarProps {
  categories: string[]
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  roles: string[]
  onRoleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function FilterBar({ categories, onCategoryChange, onStatusChange, roles, onRoleChange }: FilterBarProps) {
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

      <select onChange={onRoleChange}>
        {roles.map(role => (
          <option key={role} value={role}>
            {role === 'all' ? 'All Roles' : role}
          </option>
        ))}
        <option value="manager">Manager</option>
      </select>
    </div>
  )
}