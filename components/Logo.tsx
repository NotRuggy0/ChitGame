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
        {/* Minimal icon */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-lg blur-md" />
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        {/* Text */}
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            Chit Game
          </h1>
        </div>
      </motion.div>
    );
  }

  // Full logo for home page
  return (
    <div className={`text-center ${className}`}>
      <div className="relative w-24 h-24 mx-auto mb-8">
        {/* Outer glow ring */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-3xl blur-xl" />
        {/* Icon container */}
        <div className="relative w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
        Chit Game
      </h1>
      <p className="text-slate-300 text-lg font-light">
        Role assignment, refined
      </p>
    </div>
  );
}
