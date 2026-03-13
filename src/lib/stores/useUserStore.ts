import { create } from 'zustand';
import type { IUser } from '@/types/user.types';
import { MOCK_USER } from '../mock-data/user.mock';

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  updateUser: (updates: Partial<IUser>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: () => set({ user: MOCK_USER, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (updates) => set((state) => ({ 
    user: state.user ? { ...state.user, ...updates } : null 
  })),
}));
