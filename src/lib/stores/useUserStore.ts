import { create } from 'zustand';
import type { IUser } from '@/types/user.types';
import { MOCK_USER } from '../mock-data/user.mock';

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: () => set({ user: MOCK_USER, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
