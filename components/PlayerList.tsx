'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Player } from '../types';

interface PlayerListProps {
  players: Player[];
  currentPlayerId: string;
}

export default function PlayerList({ players, currentPlayerId }: PlayerListProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-cyan-200">
        Players ({players.length})
      </h3>

      <AnimatePresence mode="popLayout">
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            className={`p-5 rounded-2xl flex items-center justify-between transition-all duration-300 ${
              player.id === currentPlayerId 
                ? 'bg-cyan-500/10 border-2 border-cyan-400/40 shadow-[0_4px_20px_rgba(6,182,212,0.15)]' 
                : 'bg-slate-800/30 border border-cyan-500/10 hover:border-cyan-500/20'
            }`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-base transition-all duration-300 ${
                player.isReady 
                  ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-400/30 shadow-[0_2px_12px_rgba(16,185,129,0.15)]' 
                  : 'bg-slate-700/40 text-slate-400 border border-slate-600/30'
              }`}>
                {player.displayName.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate text-cyan-50">
                    {player.displayName}
                  </p>
                  {player.id === currentPlayerId && (
                    <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full font-medium border border-cyan-400/30">
                      You
                    </span>
                  )}
                  {player.isHost && (
                    <span className="text-xs px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded-full font-medium border border-teal-400/30">
                      Host
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {player.isReady ? (
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Ready</span>
                </div>
              ) : (
                <span className="text-slate-500 text-sm">Not Ready</span>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
