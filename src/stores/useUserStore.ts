import fetcher from '@/utils/fetcher';
import { create } from 'zustand';

type User = {
  id: string;
  role: string;
  username: string;
  avatar: string;
};

type UserState = {
  user: User | null;

  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    const responseBody = await fetcher({ method: 'GET', route: 'user/me' });
    if (responseBody.success) {
      set({ user: responseBody.content.user });
    } else {
      // !responseBody.success hoặc lỗi bất ngờ (ko có responsebody)
      set({ user: null });
    }
  },

  logout: async () => {
    const responseBody = await fetcher({
      method: 'POST',
      route: 'auth/logout',
    });
    if (responseBody.success) {
      set({ user: null });
    }
  },
}));
