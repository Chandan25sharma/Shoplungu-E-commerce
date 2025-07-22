import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: { firstName: string; lastName: string; email: string; password: string }) => Promise<boolean>
  logout: () => void
  updateUser: (userData: User) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // Mock login - in real app, this would call an API
        if (email === 'admin@shoplungu.com' && password === 'admin123') {
          const user = {
            id: '1',
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@shoplungu.com',
            phone: '+966 11 123 4567',
            address: {
              street: '123 Admin Street',
              city: 'Riyadh',
              state: 'Riyadh Province',
              zipCode: '11564',
              country: 'Saudi Arabia'
            }
          }
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },
      register: async (userData) => {
        // Mock registration - in real app, this would call an API
        const user = {
          id: Date.now().toString(),
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        }
        set({ user, isAuthenticated: true })
        return true
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      updateUser: (userData) => {
        set({ user: userData })
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)
