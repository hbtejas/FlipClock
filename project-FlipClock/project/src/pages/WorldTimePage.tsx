import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/ui/Button';
import { PlusCircle, X, Clock } from 'lucide-react';
import { useWorldTimeStore } from '../store/worldTimeStore';
import { WorldTimeLocation } from '../types';

// Sample list of notable timezones for selection
const availableTimezones = [
  { id: 'us-ny', name: 'New York', timezone: 'America/New_York' },
  { id: 'us-la', name: 'Los Angeles', timezone: 'America/Los_Angeles' },
  { id: 'uk-london', name: 'London', timezone: 'Europe/London' },
  { id: 'jp-tokyo', name: 'Tokyo', timezone: 'Asia/Tokyo' },
  { id: 'au-sydney', name: 'Sydney', timezone: 'Australia/Sydney' },
  { id: 'in-delhi', name: 'New Delhi', timezone: 'Asia/Kolkata' },
  { id: 'br-rio', name: 'Rio de Janeiro', timezone: 'America/Sao_Paulo' },
  { id: 'sa-dubai', name: 'Dubai', timezone: 'Asia/Dubai' },
  { id: 'sg-singapore', name: 'Singapore', timezone: 'Asia/Singapore' },
  { id: 'de-berlin', name: 'Berlin', timezone: 'Europe/Berlin' },
  { id: 'za-johannesburg', name: 'Johannesburg', timezone: 'Africa/Johannesburg' },
  { id: 'ru-moscow', name: 'Moscow', timezone: 'Europe/Moscow' },
];

const WorldTimePage: React.FC = () => {
  const { locations, addLocation, removeLocation } = useWorldTimeStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddLocation, setShowAddLocation] = useState(false);
  
  // Update current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleAddLocation = (location: WorldTimeLocation) => {
    // Check if location already exists
    if (!locations.some(loc => loc.id === location.id)) {
      addLocation(location);
    }
    setShowAddLocation(false);
  };
  
  return (
    <PageWrapper 
      title="World Time" 
      description="View the current time across different time zones"
    >
      <div className="flex flex-col items-center">
        <Button
          variant="outline"
          onClick={() => setShowAddLocation(!showAddLocation)}
          icon={<PlusCircle size={18} />}
          className="mb-6"
        >
          Add Location
        </Button>
        
        {/* Location grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <h3 className="font-medium">{location.name}</h3>
                </div>
                <button
                  onClick={() => removeLocation(location.id)}
                  className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-6 flex flex-col items-center text-center">
                <div className="text-3xl font-mono mb-2">
                  {formatInTimeZone(currentTime, location.timezone, 'HH:mm:ss')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formatInTimeZone(
                    currentTime,
                    location.timezone,
                    'EEEE, MMMM d, yyyy'
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {location.timezone.replace('_', ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Location Modal */}
        {showAddLocation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Add Location</h3>
              
              <div className="max-h-96 overflow-y-auto">
                {availableTimezones.map((tz) => (
                  <button
                    key={tz.id}
                    onClick={() => handleAddLocation(tz)}
                    className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex justify-between items-center"
                  >
                    <span>{tz.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatInTimeZone(currentTime, tz.timezone, 'HH:mm')}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddLocation(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default WorldTimePage;