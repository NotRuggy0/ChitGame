'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Theme = 'cyan-wave' | 'purple-dream' | 'sunset-glow' | 'forest-mist' | 'neon-night';

export interface ThemeConfig {
  id: Theme;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
  };
  gradient: string;
  icon: string;
}

export const THEMES: Record<Theme, ThemeConfig> = {
  'cyan-wave': {
    id: 'cyan-wave',
    name: 'Cyan Wave',
    colors: {
      primary: 'rgb(6, 182, 212)',
      secondary: 'rgb(20, 184, 166)',
      accent: 'rgb(34, 211, 238)',
      glow: 'rgba(6, 182, 212, 0.3)',
    },
    gradient: 'from-cyan-500 to-teal-500',
    icon: '🌊',
  },
  'purple-dream': {
    id: 'purple-dream',
    name: 'Purple Dream',
    colors: {
      primary: 'rgb(168, 85, 247)',
      secondary: 'rgb(217, 70, 239)',
      accent: 'rgb(192, 132, 252)',
      glow: 'rgba(168, 85, 247, 0.3)',
    },
    gradient: 'from-purple-500 to-fuchsia-500',
    icon: '💜',
  },
  'sunset-glow': {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    colors: {
      primary: 'rgb(251, 146, 60)',
      secondary: 'rgb(251, 113, 133)',
      accent: 'rgb(252, 165, 165)',
      glow: 'rgba(251, 146, 60, 0.3)',
    },
    gradient: 'from-orange-400 to-rose-400',
    icon: '🌅',
  },
  'forest-mist': {
    id: 'forest-mist',
    name: 'Forest Mist',
    colors: {
      primary: 'rgb(34, 197, 94)',
      secondary: 'rgb(74, 222, 128)',
      accent: 'rgb(134, 239, 172)',
      glow: 'rgba(34, 197, 94, 0.3)',
    },
    gradient: 'from-green-500 to-emerald-400',
    icon: '🌲',
  },
  'neon-night': {
    id: 'neon-night',
    name: 'Neon Night',
    colors: {
      primary: 'rgb(236, 72, 153)',
      secondary: 'rgb(59, 130, 246)',
      accent: 'rgb(139, 92, 246)',
      glow: 'rgba(236, 72, 153, 0.3)',
    },
    gradient: 'from-pink-500 to-blue-500',
    icon: '🎆',
  },
};

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-700/50 text-cyan-300 rounded-xl border border-cyan-500/20 transition-all"
        aria-label="Change theme"
      >
        <span className="text-xl">{THEMES[currentTheme].icon}</span>
        <span className="hidden sm:inline text-sm">Theme</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-full right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-3 shadow-[0_8px_32px_rgba(6,182,212,0.2)] z-50 min-w-[200px]"
            >
              <div className="space-y-2">
                {Object.values(THEMES).map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      currentTheme === theme.id
                        ? 'bg-gradient-to-r ' + theme.gradient + ' text-white shadow-lg'
                        : 'hover:bg-slate-800/50 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{theme.icon}</span>
                    <span className="text-sm font-medium">{theme.name}</span>
                    {currentTheme === theme.id && (
                      <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
