import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  slug: string
  sku?: string
  maxQuantity?: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) => {
    const items = get().items
    const existingItem = items.find(i => i.id === item.id)

    if (existingItem) {
      const newQuantity = existingItem.quantity + (item.quantity || 1)
      const maxQuantity = item.maxQuantity || 999

      set({
        items: items.map(i =>
          i.id === item.id
            ? { ...i, quantity: Math.min(newQuantity, maxQuantity) }
            : i
        )
      })
    } else {
      set({
        items: [...items, { ...item, quantity: item.quantity || 1 }]
      })
    }
  },

  removeItem: (id) => {
    set({
      items: get().items.filter(item => item.id !== id)
    })
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }

    set({
      items: get().items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(quantity, item.maxQuantity || 999) }
          : item
      )
    })
  },

  clearCart: () => {
    set({ items: [] })
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set({ isOpen: !get().isOpen }),
}))
