import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import FlipClock from '../components/ui/FlipClock';
import { TimeUnit } from '../types';

const ClockPage: React.FC = () => {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([
    { label: 'hours', value: 0 },
    { label: 'minutes', value: 0 },
    { label: 'seconds', value: 0 }
  ]);

  useEffect(() => {
    // Update the clock every second
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTimeUnits(prevUnits => [
        { 
          label: 'hours', 
          value: hours, 
          previous: prevUnits[0].value !== hours ? prevUnits[0].value : undefined 
        },
        { 
          label: 'minutes', 
          value: minutes, 
          previous: prevUnits[1].value !== minutes ? prevUnits[1].value : undefined 
        },
        { 
          label: 'seconds', 
          value: seconds, 
          previous: prevUnits[2].value !== seconds ? prevUnits[2].value : undefined 
        }
      ]);
    };

    // Run once immediately
    updateClock();
    
    // Then set up interval
    const intervalId = setInterval(updateClock, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Get current date string
  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <PageWrapper 
      title="Clock" 
      description="Current local time with flip animation"
    >
      <div className="flex flex-col items-center">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">{currentDate}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-8">
          <FlipClock 
            timeUnits={timeUnits} 
            className="text-4xl md:text-6xl" 
          />
        </div>
        
        <div className="mt-8 text-center max-w-lg">
          <h2 className="text-xl font-semibold mb-2">About the Clock</h2>
          <p className="text-gray-700 dark:text-gray-300">
            This flip clock displays your current local time with realistic flip animations. 
            Watch the smooth transitions as each digit changes.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ClockPage;