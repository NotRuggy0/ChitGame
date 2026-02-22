'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'full' | 'minimal';
  className?: string;
}

export default function Logo({ variant = 'full', className = '' }: LogoProps) {
  if (variant === 'minimal') {
    // Minimal logo for top-left corner
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-center gap-3 ${className}`}
      >
        {/* Minimal icon with subtle glow */}
        <div className="relative w-10 h-10 group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-400/15 rounded-2xl blur-lg group-hover:from-cyan-400/30 group-hover:to-teal-400/25 transition-all duration-500" />
          <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/80 to-teal-500/70 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(6,182,212,0.2)]">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        {/* Text with subtle gradient */}
        <div>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-400 bg-clip-text text-transparent tracking-tight">
            Chit Game
          </h1>
        </div>
      </motion.div>
    );
  }

  // Full logo for home page - minimal and elegant
  return (
    <div className={`text-center ${className}`}>
      <motion.div 
        className="relative w-28 h-28 mx-auto mb-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Subtle outer glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 to-teal-400/10 rounded-[2rem] blur-2xl animate-wave-pulse" />
        {/* Icon container with minimal design */}
        <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/70 to-teal-500/60 rounded-[1.75rem] flex items-center justify-center shadow-[0_8px_40px_rgba(6,182,212,0.25)] border border-cyan-400/20">
          <svg className="w-14 h-14 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </motion.div>
      
      <motion.h1 
        className="text-6xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-400 bg-clip-text text-transparent tracking-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Chit Game
      </motion.h1>
      
      <motion.p 
        className="text-cyan-400/70 text-base font-light tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Minimal · Elegant · Wave
      </motion.p>
    </div>
  );
}
