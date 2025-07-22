import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(
          item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
        )
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        }
        
        return { items: [...state.items, { ...newItem, quantity: 1 }] }
      }),
      removeItem: (id, size, color) => set((state) => ({
        items: state.items.filter(
          item => !(item.id === id && item.size === size && item.color === color)
        )
      })),
      updateQuantity: (id, size, color, quantity) => set((state) => ({
        items: quantity === 0 
          ? state.items.filter(item => !(item.id === id && item.size === size && item.color === color))
          : state.items.map(item =>
              item.id === id && item.size === size && item.color === color
                ? { ...item, quantity }
                : item
            )
      })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)
