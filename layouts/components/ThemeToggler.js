import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (process.env.NODE_ENV === 'development') {
    return (
      <button
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 ring-blue-400 transition-all duration-300 hover:ring-2 focus:outline-none dark:bg-slate-200"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label="Toggle Dark Mode"
      >
        {theme === 'light' ? (
          <MoonIcon className="text-white-500 h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5 text-yellow-700" />
        )}
      </button>
    );
  } else {
    null;
  }
};

export default ThemeToggler;
