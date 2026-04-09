import { create } from 'zustand';

type ButtonState = {
  held: string | number;
  pressed: string | number;
  activePressedIds: Array<string | number>;
  setHeld: (buttonId: string | number) => void;
  setPressed: (buttonId: string | number) => void;
  clearHeld: (buttonId: string | number) => void;
  clearPressed: (buttonId: string | number) => void;
};

export const useButtonState = create<ButtonState>()((set) => ({
  held: '',
  pressed: '',
  activePressedIds: [],
  setHeld: (buttonId) => set({ held: buttonId }),
  setPressed: (buttonId) =>
    set((state) => {
      const nextActivePressedIds = [
        ...state.activePressedIds.filter((id) => id !== buttonId),
        buttonId,
      ];

      return {
        activePressedIds: nextActivePressedIds,
        pressed: nextActivePressedIds[nextActivePressedIds.length - 1] ?? '',
      };
    }),
  clearHeld: (buttonId) =>
    set((state) => ({
      held: state.held === buttonId ? '' : state.held,
    })),
  clearPressed: (buttonId) =>
    set((state) => {
      const nextActivePressedIds = state.activePressedIds.filter(
        (id) => id !== buttonId,
      );

      return {
        activePressedIds: nextActivePressedIds,
        pressed: nextActivePressedIds[nextActivePressedIds.length - 1] ?? '',
      };
    }),
}));
