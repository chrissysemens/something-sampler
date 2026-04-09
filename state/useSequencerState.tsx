import { create } from 'zustand';

const PAD_COUNT = 24;
export const SEQUENCER_STEP_COUNT = 16;

type Pad = {
  id: number;
  soundId: string | null;
  pattern: boolean[];
  effects: string[];
};

type SequencerState = {
  pads: Pad[];
  currentStep: number;
  isPlaying: boolean;
  bpm: number;
  volume: number;
  toggleStep: (padId: number, stepIndex: number) => void;
  advanceStep: () => void;
  setPlaying: (isPlaying: boolean) => void;
  setBpm: (bpm: number) => void;
  setVolume: (volume: number) => void;
  assignSound: (padId: number, soundId: string | null) => void;
};

const createEmptyPattern = () =>
  Array.from({ length: SEQUENCER_STEP_COUNT }, () => false);

const initialPads: Pad[] = Array.from({ length: PAD_COUNT }, (_, index) => ({
  id: index,
  soundId: null,
  pattern: createEmptyPattern(),
  effects: [],
}));

export const useSequencerStore = create<SequencerState>()((set) => ({
  pads: initialPads,
  currentStep: 0,
  isPlaying: false,
  bpm: 120,
  volume: 0.8,
  mode: null,

  toggleStep: (padId, stepIndex) =>
    set((state) => ({
      pads: state.pads.map((pad) => {
        if (pad.id !== padId) return pad;

        const nextPattern = [...pad.pattern];
        nextPattern[stepIndex] = !nextPattern[stepIndex];

        return {
          ...pad,
          pattern: nextPattern,
        };
      }),
    })),

  advanceStep: () =>
    set((state) => ({
      currentStep: (state.currentStep + 1) % SEQUENCER_STEP_COUNT,
    })),

  setPlaying: (isPlaying) => set({ isPlaying }),

  setBpm: (bpm) =>
    set({
      bpm: Math.max(20, Math.min(300, Math.round(bpm))),
    }),

  setVolume: (volume) =>
    set({
      volume: Math.max(0, Math.min(1, volume)),
    }),

  assignSound: (padId, soundId) =>
    set((state) => ({
      pads: state.pads.map((pad) =>
        pad.id === padId ? { ...pad, soundId } : pad,
      ),
    })),
}));
