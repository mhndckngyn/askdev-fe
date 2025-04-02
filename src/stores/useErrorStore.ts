import { create } from 'zustand';

type ErrorState = {
  errorMessage: string | null;
  showError: boolean;
  setError: (message: string) => void;
  clearError: () => void;
};

export const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: null,
  showError: false,
  setError: (message) => set({ errorMessage: message, showError: true }),
  clearError: () => set({ errorMessage: null, showError: false }),
}));
