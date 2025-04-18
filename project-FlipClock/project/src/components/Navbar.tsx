import React from 'react';
import { NavLink } from 'react-router-dom';
import { Clock, HourglassIcon, TimerIcon, Globe } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => `
    flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
    ${isActive
      ? 'bg-primary-100 text-primary-700 dark:bg-gray-800 dark:text-primary-400'
      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    }
  `;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">FlipClock</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <NavLink to="/" end className={navLinkClass}>
                <Clock size={18} />
                <span>Clock</span>
              </NavLink>
              
              <NavLink to="/countdown" className={navLinkClass}>
                <HourglassIcon size={18} />
                <span>Countdown</span>
              </NavLink>
              
              <NavLink to="/timer" className={navLinkClass}>
                <TimerIcon size={18} />
                <span>Timer</span>
              </NavLink>
              
              <NavLink to="/world-time" className={navLinkClass}>
                <Globe size={18} />
                <span>World Time</span>
              </NavLink>
            </div>
          </div>
          
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-4 justify-items-center py-2">
          <NavLink to="/" end className="flex flex-col items-center py-1 px-2">
            <Clock size={20} className={({ isActive }: { isActive: boolean }) => 
              isActive ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-400"
            } />
            <span className="text-xs mt-1">Clock</span>
          </NavLink>
          
          <NavLink to="/countdown" className="flex flex-col items-center py-1 px-2">
            <HourglassIcon size={20} className={({ isActive }: { isActive: boolean }) => 
              isActive ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-400"
            } />
            <span className="text-xs mt-1">Countdown</span>
          </NavLink>
          
          <NavLink to="/timer" className="flex flex-col items-center py-1 px-2">
            <TimerIcon size={20} className={({ isActive }: { isActive: boolean }) => 
              isActive ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-400"
            } />
            <span className="text-xs mt-1">Timer</span>
          </NavLink>
          
          <NavLink to="/world-time" className="flex flex-col items-center py-1 px-2">
            <Globe size={20} className={({ isActive }: { isActive: boolean }) => 
              isActive ? "text-primary-600 dark:text-primary-400" : "text-gray-500 dark:text-gray-400"
            } />
            <span className="text-xs mt-1">World</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;