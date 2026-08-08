# Before / After Snapshot

## `app/(dashboard)/products/page.tsx`

### Before
```
        <SearchBar onSearch={() => {}} placeholder="Search products..." />
      <ProductTable products={products} />
```

### After
```
'use client'
import { useState } from 'react'
  const [searchQuery, setSearchQuery] = useState('')
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

        <SearchBar onSearch={(query) => setSearchQuery(query)} placeholder="Search products..." />
      <ProductTable products={filteredProducts} />
```
