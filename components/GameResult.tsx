'use client';

import { motion } from 'framer-motion';
import type { Chit } from '../types';

interface GameResultProps {
  assignedChit: Chit;
  onLeaveGame: () => void;
}

export default function GameResult({ assignedChit, onLeaveGame }: GameResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl px-4"
    >
      <div className="luxury-card text-center space-y-6 wave-glow">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-block p-4 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl mb-4 border border-cyan-400/20 shadow-[0_4px_20px_rgba(6,182,212,0.15)]">
            <svg className="w-12 h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-cyan-300/80">Your Role</h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative p-8 bg-gradient-to-br from-cyan-500/8 to-teal-500/8 rounded-3xl border-2 border-cyan-400/25 overflow-hidden backdrop-blur-sm shadow-[0_8px_32px_rgba(6,182,212,0.12)]"
        >
          {/* Subtle animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-teal-500/8 opacity-50" />
          <div className="relative z-10">
            <h3 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4">
              {assignedChit.roleName}
            </h3>
            {assignedChit.description && (
              <p className="text-lg text-slate-300 max-w-md mx-auto">
                {assignedChit.description}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <p className="text-sm text-slate-500">
            Keep this role private. The game coordinator will guide you from here.
          </p>
          
          <button
            onClick={onLeaveGame}
            className="luxury-button-secondary w-full"
          >
            Leave Game
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
