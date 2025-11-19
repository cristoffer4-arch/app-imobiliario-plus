'use client';

import { Sun, Moon, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'accessibility'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'accessibility' || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'accessibility') => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'accessibility');
    root.classList.add(newTheme);
    
    if (newTheme === 'accessibility') {
      root.style.setProperty('--font-size-base', '18px');
      root.style.setProperty('--line-height-base', '1.8');
    } else {
      root.style.setProperty('--font-size-base', '16px');
      root.style.setProperty('--line-height-base', '1.5');
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'accessibility') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => handleThemeChange('light')}
        className={`p-2 rounded-md transition-all ${
          theme === 'light' 
            ? 'bg-yellow-100 text-yellow-600' 
            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        title="Tema Claro"
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleThemeChange('dark')}
        className={`p-2 rounded-md transition-all ${
          theme === 'dark' 
            ? 'bg-indigo-100 text-indigo-600' 
            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        title="Tema Escuro"
      >
        <Moon className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleThemeChange('accessibility')}
        className={`p-2 rounded-md transition-all ${
          theme === 'accessibility' 
            ? 'bg-green-100 text-green-600' 
            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        title="Modo Acessibilidade"
      >
        <Eye className="w-5 h-5" />
      </button>
    </div>
  );
}
