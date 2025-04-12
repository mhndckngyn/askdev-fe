import { create } from 'zustand';

type ActionModalState = {
  message: string | null;
  actionName: string | null;
  opened: boolean;
  onConfirm?: () => void;
  setAction: (
    message: string,
    actionName: string,
    onConfirm?: () => void,
  ) => void;
  clearAction: () => void;
  confirmAction: () => void;
};

export const useActionStore = create<ActionModalState>((set, get) => ({
  message: null,
  actionName: null,
  opened: false,
  onConfirm: undefined,

  setAction: (message, actionName, onConfirm) =>
    set({ message, actionName, onConfirm, opened: true }),
  clearAction: () =>
    set({
      message: null,
      actionName: null,
      onConfirm: undefined,
      opened: false,
    }),

  confirmAction: () => {
    const { onConfirm } = get();
    if (onConfirm) onConfirm();
    set({
      message: null,
      actionName: null,
      onConfirm: undefined,
      opened: false,
    });
  },
}));
