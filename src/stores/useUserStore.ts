import fetcher from '@/utils/fetcher';
import { create } from 'zustand';

type User = {
  id: string;
  role: "ADMIN" | "MEMBER";
  username: string;
  avatar: string;
};

type UserState = {
  user: User | null;
  isLoading: boolean;

  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    set({ isLoading: true }); 
    const responseBody = await fetcher({ method: 'GET', route: 'user/me' });
    if (responseBody.success) {
      set({ user: responseBody.content.user });
    } else {
      // !responseBody.success hoặc lỗi bất ngờ (ko có responsebody)
      set({ user: null });
    }
    set({ isLoading: false }); 
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
