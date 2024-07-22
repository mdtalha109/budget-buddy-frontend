import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-between w-16 h-8 p-1 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg transition-colors duration-300 focus:outline-none"
    >

      <span className="absolute left-1 flex items-center justify-center w-6 h-6 bg-yellow-600 rounded-full shadow-md transform transition-transform duration-300 dark:translate-x-8">
        <FontAwesomeIcon icon={faMoon} className="text-white" />
      </span>
    </button>
  );
};

export default ThemeToggle;
