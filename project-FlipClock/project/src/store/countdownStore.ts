import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CountdownSettings } from '../types';

interface CountdownState {
  settings: CountdownSettings;
  setTargetDate: (date: Date) => void;
  toggleRunning: () => void;
  resetCountdown: () => void;
}

// Set default target date to tomorrow
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

export const useCountdownStore = create<CountdownState>()(
  persist(
    (set) => ({
      settings: {
        targetDate: tomorrow,
        isRunning: false,
      },
      setTargetDate: (date: Date) => 
        set((state) => ({ 
          settings: { ...state.settings, targetDate: date } 
        })),
      toggleRunning: () => 
        set((state) => ({
          settings: { ...state.settings, isRunning: !state.settings.isRunning }
        })),
      resetCountdown: () => 
        set({ 
          settings: { targetDate: tomorrow, isRunning: false } 
        }),
    }),
    {
      name: 'countdown-storage',
    }
  )
);