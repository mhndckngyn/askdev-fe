import axiosInstance from '@/utils/axiosInstance';
import { create } from 'zustand';

type User = {
  id: string;
  role: string;
  username: string;
  avatar: string;
};

type UserState = {
  user: User | null;
  loading: boolean;

  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    try {
      set({ loading: true });
      const { data: body } = await axiosInstance.get('user/me');
      set({ user: body.content.user });
    } catch (err) {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('auth/logout');
    } catch (error) {
      console.log(error);
    } finally {
      set({ user: null, loading: false });
    }
  },
}));
