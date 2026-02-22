'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'full' | 'minimal';
  className?: string;
}

export default function Logo({ variant = 'full', className = '' }: LogoProps) {
  if (variant === 'minimal') {
    // Minimal logo for top-left corner - with dynamic theme
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-center gap-3 ${className}`}
      >
        {/* Minimal icon with subtle glow - uses theme */}
        <div className="relative w-10 h-10 group">
          <div 
            className="absolute inset-0 rounded-2xl blur-lg transition-all duration-500"
            style={{
              background: `linear-gradient(to bottom right, var(--theme-primary), var(--theme-secondary))`,
              opacity: 0.2
            }}
          />
          <div 
            className="relative w-full h-full rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(to bottom right, var(--theme-primary), var(--theme-secondary))`,
              opacity: 0.8,
              boxShadow: `0 4px 20px var(--theme-glow)`
            }}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        {/* Text with subtle gradient - uses theme */}
        <div>
          <h1 
            className="text-lg font-semibold bg-clip-text text-transparent tracking-tight"
            style={{
              backgroundImage: `linear-gradient(to right, var(--theme-primary), var(--theme-accent), var(--theme-secondary))`
            }}
          >
            Chit Game
          </h1>
        </div>
      </motion.div>
    );
  }

  // Full logo for home page - minimal and elegant with dynamic theme
  return (
    <div className={`text-center ${className}`}>
      <motion.div 
        className="relative w-28 h-28 mx-auto mb-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Subtle outer glow - uses theme */}
        <div 
          className="absolute inset-0 rounded-[2rem] blur-2xl animate-wave-pulse"
          style={{
            background: `linear-gradient(to bottom right, var(--theme-primary), var(--theme-secondary))`,
            opacity: 0.15
          }}
        />
        {/* Icon container with minimal design - uses theme */}
        <div 
          className="relative w-full h-full rounded-[1.75rem] flex items-center justify-center border"
          style={{
            background: `linear-gradient(to bottom right, var(--theme-primary), var(--theme-secondary))`,
            opacity: 0.7,
            boxShadow: `0 8px 40px var(--theme-glow)`,
            borderColor: 'var(--theme-accent)'
          }}
        >
          <svg className="w-14 h-14 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </motion.div>
      
      <motion.h1 
        className="text-6xl font-bold mb-3 bg-clip-text text-transparent tracking-tight"
        style={{
          backgroundImage: `linear-gradient(to right, var(--theme-primary), var(--theme-accent), var(--theme-secondary))`
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Chit Game
      </motion.h1>
      
      <motion.p 
        className="text-base font-light tracking-wider"
        style={{ color: 'var(--theme-primary)', opacity: 0.7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Minimal · Elegant · Wave
      </motion.p>
    </div>
  );
}
