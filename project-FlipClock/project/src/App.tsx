import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ClockPage from './pages/ClockPage';
import CountdownPage from './pages/CountdownPage';
import TimerPage from './pages/TimerPage';
import WorldTimePage from './pages/WorldTimePage';
import { useThemeStore } from './store/themeStore';

function App() {
  const { isDarkMode } = useThemeStore();

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Update document title
  useEffect(() => {
    document.title = 'FlipClock';
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ClockPage />} />
            <Route path="/countdown" element={<CountdownPage />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/world-time" element={<WorldTimePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} FlipClock App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;