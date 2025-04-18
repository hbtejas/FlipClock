export interface TimeUnit {
  label: string;
  value: number;
  previous?: number;
}

export interface CountdownSettings {
  targetDate: Date;
  isRunning: boolean;
}

export interface TimerState {
  isRunning: boolean;
  elapsedTimeMs: number;
  startTime: number | null;
  lastElapsedTime: number;
}

export interface WorldTimeLocation {
  id: string;
  name: string;
  timezone: string;
}