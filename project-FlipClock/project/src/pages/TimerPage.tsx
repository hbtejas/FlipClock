import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import FlipClock from '../components/ui/FlipClock';
import Button from '../components/ui/Button';
import { Play, Pause, RefreshCw, Flag } from 'lucide-react';
import { TimeUnit } from '../types';
import { useTimerStore } from '../store/timerStore';

const TimerPage: React.FC = () => {
  const { isRunning, elapsedTimeMs, startTimer, pauseTimer, resetTimer } = useTimerStore();
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);
  const [laps, setLaps] = useState<number[]>([]);
  
  // Update timer display
  useEffect(() => {
    const updateTimer = () => {
      let currentElapsed = elapsedTimeMs;
      
      if (isRunning) {
        const startTime = Date.now() - elapsedTimeMs;
        currentElapsed = Date.now() - startTime;
      }
      
      // Calculate hours, minutes, seconds, milliseconds
      const totalSeconds = Math.floor(currentElapsed / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const milliseconds = Math.floor((currentElapsed % 1000) / 10);
      
      setTimeUnits(prevUnits => [
        { 
          label: 'hours', 
          value: hours, 
          previous: prevUnits[0]?.value !== hours ? prevUnits[0]?.value : undefined 
        },
        { 
          label: 'minutes', 
          value: minutes, 
          previous: prevUnits[1]?.value !== minutes ? prevUnits[1]?.value : undefined 
        },
        { 
          label: 'seconds', 
          value: seconds, 
          previous: prevUnits[2]?.value !== seconds ? prevUnits[2]?.value : undefined 
        },
        { 
          label: 'ms', 
          value: milliseconds, 
          previous: prevUnits[3]?.value !== milliseconds ? prevUnits[3]?.value : undefined 
        }
      ]);
    };
    
    // Initial update
    updateTimer();
    
    // Update timer at 10ms intervals if running
    let intervalId: number | null = null;
    if (isRunning) {
      intervalId = window.setInterval(updateTimer, 50);
    }
    
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, elapsedTimeMs]);

  const handleReset = () => {
    resetTimer();
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps(prevLaps => [elapsedTimeMs, ...prevLaps]);
    }
  };

  // Format milliseconds to HH:MM:SS.ms
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return `${hours.toString().padStart(2, '0')}:${
      minutes.toString().padStart(2, '0')}:${
      seconds.toString().padStart(2, '0')}.${
      milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <PageWrapper 
      title="Timer" 
      description="Stopwatch timer with lap functionality"
    >
      <div className="flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-8">
          <FlipClock 
            timeUnits={timeUnits} 
            className="text-3xl md:text-5xl" 
          />
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center mt-4 mb-8">
          <Button
            variant="primary"
            onClick={isRunning ? pauseTimer : startTimer}
            icon={isRunning ? <Pause size={18} /> : <Play size={18} />}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          
          <Button
            variant="accent"
            onClick={handleLap}
            disabled={!isRunning}
            icon={<Flag size={18} />}
          >
            Lap
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleReset}
            icon={<RefreshCw size={18} />}
          >
            Reset
          </Button>
        </div>
        
        {laps.length > 0 && (
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="font-medium">Laps</h3>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {laps.map((lapTime, index) => (
                <div 
                  key={index} 
                  className="p-3 flex justify-between items-center border-b last:border-b-0 dark:border-gray-700"
                >
                  <span className="font-medium">Lap {laps.length - index}</span>
                  <span className="font-mono">{formatTime(lapTime)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default TimerPage;