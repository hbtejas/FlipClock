import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WorldTimeLocation } from '../types';

interface WorldTimeState {
  locations: WorldTimeLocation[];
  addLocation: (location: WorldTimeLocation) => void;
  removeLocation: (id: string) => void;
}

// Default locations
const defaultLocations: WorldTimeLocation[] = [
  { id: '1', name: 'New York', timezone: 'America/New_York' },
  { id: '2', name: 'London', timezone: 'Europe/London' },
  { id: '3', name: 'Tokyo', timezone: 'Asia/Tokyo' },
];

export const useWorldTimeStore = create<WorldTimeState>()(
  persist(
    (set) => ({
      locations: defaultLocations,
      
      addLocation: (location: WorldTimeLocation) => 
        set((state) => ({
          locations: [...state.locations, location]
        })),
      
      removeLocation: (id: string) => 
        set((state) => ({
          locations: state.locations.filter(location => location.id !== id)
        })),
    }),
    {
      name: 'world-time-storage',
    }
  )
);