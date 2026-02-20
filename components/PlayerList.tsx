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
      <h3 className="text-lg font-semibold text-white">
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
            className={`luxury-card flex items-center justify-between ${
              player.id === currentPlayerId ? 'ring-2 ring-indigo-400 bg-indigo-500/10' : ''
            }`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                player.isReady ? 'bg-green-500/20 text-green-300' : 'bg-white/10 text-slate-300'
              }`}>
                {player.displayName.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate text-white">
                    {player.displayName}
                  </p>
                  {player.id === currentPlayerId && (
                    <span className="text-xs px-2 py-0.5 bg-indigo-500/30 text-indigo-300 rounded-full font-medium border border-indigo-400/30">
                      You
                    </span>
                  )}
                  {player.isHost && (
                    <span className="text-xs px-2 py-0.5 bg-purple-500/30 text-purple-300 rounded-full font-medium border border-purple-400/30">
                      Host
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {player.isReady ? (
                <div className="flex items-center gap-1.5 text-green-400 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Ready</span>
                </div>
              ) : (
                <span className="text-slate-400 text-sm">Not Ready</span>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
