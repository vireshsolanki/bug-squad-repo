export interface User {
  id: string
  email: string
  password: string
  name: string
  role: 'admin' | 'manager' | 'viewer'
  profile?: {
    name: string
    avatar?: string
    bio?: string
  }
  createdAt: string
}

export interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  status: 'in_stock' | 'out_of_stock'
  sku: string
  createdAt: string
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
}
