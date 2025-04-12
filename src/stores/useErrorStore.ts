import { create } from 'zustand';

type ErrorState = {
  message: string | null;
  opened: boolean;
  setError: (message: string) => void;
  clearError: () => void;
};

export const useErrorStore = create<ErrorState>((set) => ({
  message: null,
  opened: false,
  
  setError: (message) => set({ message: message, opened: true }),
  clearError: () => set({ message: null, opened: false }),
}));
