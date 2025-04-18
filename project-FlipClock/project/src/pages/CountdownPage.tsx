import React, { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import PageWrapper from '../components/PageWrapper';
import FlipClock from '../components/ui/FlipClock';
import Button from '../components/ui/Button';
import { Play, Pause, RefreshCw, Calendar } from 'lucide-react';
import { TimeUnit } from '../types';
import { useCountdownStore } from '../store/countdownStore';

const CountdownPage: React.FC = () => {
  const { settings, toggleRunning, resetCountdown, setTargetDate } = useCountdownStore();
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');

  // Initialize date and time inputs
  useEffect(() => {
    const target = settings.targetDate;
    setDateInput(target.toISOString().split('T')[0]);
    
    const hours = target.getHours().toString().padStart(2, '0');
    const minutes = target.getMinutes().toString().padStart(2, '0');
    setTimeInput(`${hours}:${minutes}`);
  }, [settings.targetDate]);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const diff = Math.max(0, differenceInSeconds(settings.targetDate, now));
      setTimeRemaining(diff);
      
      // Convert seconds to days, hours, minutes, seconds
      const days = Math.floor(diff / (24 * 60 * 60));
      const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((diff % (60 * 60)) / 60);
      const seconds = Math.floor(diff % 60);
      
      setTimeUnits(prevUnits => [
        { 
          label: 'days', 
          value: days, 
          previous: prevUnits[0]?.value !== days ? prevUnits[0]?.value : undefined 
        },
        { 
          label: 'hours', 
          value: hours, 
          previous: prevUnits[1]?.value !== hours ? prevUnits[1]?.value : undefined 
        },
        { 
          label: 'minutes', 
          value: minutes, 
          previous: prevUnits[2]?.value !== minutes ? prevUnits[2]?.value : undefined 
        },
        { 
          label: 'seconds', 
          value: seconds, 
          previous: prevUnits[3]?.value !== seconds ? prevUnits[3]?.value : undefined 
        }
      ]);
    };

    // Initial calculation
    calculateTimeRemaining();
    
    // Only continue updates if countdown is running and time remains
    let intervalId: number | null = null;
    if (settings.isRunning && timeRemaining > 0) {
      intervalId = window.setInterval(calculateTimeRemaining, 1000);
    }
    
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [settings.isRunning, settings.targetDate, timeRemaining]);

  const handleSaveDate = () => {
    const dateTimeStr = `${dateInput}T${timeInput}:00`;
    const newTargetDate = new Date(dateTimeStr);
    
    if (!isNaN(newTargetDate.getTime())) {
      setTargetDate(newTargetDate);
      setShowDatePicker(false);
    }
  };

  const targetDateString = settings.targetDate.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <PageWrapper 
      title="Countdown" 
      description="Count down to an important date and time"
    >
      <div className="flex flex-col items-center">
        <div className="text-center mb-4">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {timeRemaining > 0 
              ? `Counting down to ${targetDateString}` 
              : 'Countdown complete!'}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-8">
          <FlipClock 
            timeUnits={timeUnits} 
            className="text-3xl md:text-5xl" 
          />
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Button
            variant="primary"
            onClick={toggleRunning}
            icon={settings.isRunning ? <Pause size={18} /> : <Play size={18} />}
          >
            {settings.isRunning ? 'Pause' : 'Start'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowDatePicker(true)}
            icon={<Calendar size={18} />}
          >
            Set Date
          </Button>
          
          <Button
            variant="secondary"
            onClick={resetCountdown}
            icon={<RefreshCw size={18} />}
          >
            Reset
          </Button>
        </div>
        
        {showDatePicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Set Countdown Date & Time</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowDatePicker(false)}
                >
                  Cancel
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleSaveDate}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default CountdownPage;