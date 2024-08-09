import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isLoggedIn: boolean
  setLoggedIn: (isLoggedIn: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      setLoggedIn: (isLoggedIn: boolean): void => { set({ isLoggedIn: isLoggedIn }); },
    }),
    {
      name: 'isLoggedIn',
    },
  ),
)