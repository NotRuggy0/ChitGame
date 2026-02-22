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
      <div className="luxury-card text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl" />
        <div className="relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-block p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl mb-4 border border-orange-400/30">
            <svg className="w-12 h-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-slate-300">Your Role</h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl border-2 border-orange-400/30 overflow-hidden backdrop-blur-sm"
        >
          {/* Subtle animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10 opacity-50" />
          <div className="relative z-10">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
              {assignedChit.roleName}
            </h3>
            {assignedChit.description && (
              <p className="text-lg text-slate-200 max-w-md mx-auto">
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
          <p className="text-sm text-slate-400">
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
      </div>
    </motion.div>
  );
}
