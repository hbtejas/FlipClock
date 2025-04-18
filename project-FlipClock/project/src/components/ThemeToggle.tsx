import React, { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import Button from './ui/Button';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  // Apply dark mode class to document when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="p-2"
      icon={
        isDarkMode ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )
      }
    >
      <span className="sr-only">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </Button>
  );
};

export default ThemeToggle;