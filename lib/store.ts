'use client'

import { create } from 'zustand'
import type { Product, CartItem, User } from './types'

interface StoreState {
  products: Product[]
  cart: CartItem[]
  users: User[] // Assuming User type is defined and includes role
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  logout: () => void
  // Hypothetical function to filter users by role
  filterUsersByRole: (role: string) => User[]
}

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  cart: [],
  users: [], // Initialize users
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Failed to fetch products')
      const data: Product[] = await res.json()
      set({ products: data, loading: false })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Unknown error' })
    }
  },

  addToCart: (item: CartItem) => {
    const cart = get().cart
    cart.push(item)
    set({ cart })
  },

  removeFromCart: (id: string) => {
    set({ cart: get().cart.filter(i => i.id !== id) })
  },

  clearCart: () => set({ cart: [] }),

  logout: () => {
    set({ products: [], error: null })
  },

  // Hypothetical function to filter users
  filterUsersByRole: (role: string) => {
    return get().users.filter(user => user.role.includes(role) || user.role === 'manager')
  },
}))