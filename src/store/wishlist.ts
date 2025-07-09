import { create } from 'zustand'

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  slug: string
  comparePrice?: number
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
  getTotalItems: () => number
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    const items = get().items
    const existingItem = items.find(i => i.id === item.id)

    if (!existingItem) {
      set({
        items: [...items, item]
      })
    }
  },

  removeItem: (id) => {
    set({
      items: get().items.filter(item => item.id !== id)
    })
  },

  isInWishlist: (id) => {
    return get().items.some(item => item.id === id)
  },

  clearWishlist: () => {
    set({ items: [] })
  },

  getTotalItems: () => {
    return get().items.length
  },
}))
