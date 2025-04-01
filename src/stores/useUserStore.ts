import { create } from "zustand";

type User = {
  id: string;
  username: string;
  avatar: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "1",
    username: "minh",
    avatar: "https://randomuser.me/api/portraits/men/26.jpg",
  },
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
