'use client'

import { create } from 'zustand'
import type { Product, CartItem } from './types'

interface StoreState {
  products: Product[]
  cart: CartItem[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  logout: () => void
}

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  cart: [],
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
}))