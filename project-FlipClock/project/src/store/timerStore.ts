import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TimerState } from '../types';

interface TimerStore extends TimerState {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set) => ({
      isRunning: false,
      elapsedTimeMs: 0,
      startTime: null,
      lastElapsedTime: 0,
      
      startTimer: () => set((state) => {
        if (state.isRunning) return state;
        return {
          isRunning: true,
          startTime: Date.now() - state.lastElapsedTime,
          elapsedTimeMs: state.lastElapsedTime,
        };
      }),
      
      pauseTimer: () => set((state) => {
        if (!state.isRunning) return state;
        const currentElapsed = state.startTime ? Date.now() - state.startTime : 0;
        return {
          isRunning: false,
          lastElapsedTime: currentElapsed,
          elapsedTimeMs: currentElapsed,
          startTime: null,
        };
      }),
      
      resetTimer: () => set({
        isRunning: false,
        elapsedTimeMs: 0,
        startTime: null,
        lastElapsedTime: 0,
      }),
    }),
    {
      name: 'timer-storage',
    }
  )
);