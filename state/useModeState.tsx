import { create } from 'zustand';

type Mode = 'program' | 'playback';

type ModeState = {
  activeMode: 'program' | 'playback' | null;
  setActiveMode: (mode: Mode | null) => void;
  activePad: number | string | null;
  setActivePad: (padId: number | string | null) => void;
};

export const useModeState = create<ModeState>()((set) => ({
  activeMode: null,
  setActiveMode: (mode) => set({ activeMode: mode }),
  activePad: null,
  setActivePad: (padId) => set({ activePad: padId }),
}));
