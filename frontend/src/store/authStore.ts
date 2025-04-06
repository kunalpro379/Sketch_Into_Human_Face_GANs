import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  credits: number;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  decrementCredits: () => void;
}

const mockUser = {
  email: 'kunal@gmail.com',
  password: 'kunal',
  credits: 2000,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email: string, password: string) => {
        if (email === mockUser.email && password === mockUser.password) {
          set({ user: { email: mockUser.email, credits: mockUser.credits } });
          return true;
        }
        return false;
      },
      signup: async (email: string, password: string) => {
        set({ user: { email, credits: 2 } });
        return true;
      },
      logout: () => set({ user: null }),
      decrementCredits: () => 
        set((state) => ({
          user: state.user ? { ...state.user, credits: state.user.credits - 1 } : null
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);