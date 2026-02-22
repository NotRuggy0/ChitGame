'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGameHistory, getGameStats, clearGameHistory, GameHistoryEntry } from '../utils/gameHistory';

export default function GameHistory() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<GameHistoryEntry[]>([]);
  const [stats, setStats] = useState({ totalGames: 0, asHost: 0, asPlayer: 0, recentRoles: [] as (string | undefined)[] });

  useEffect(() => {
    if (isOpen) {
      setHistory(getGameHistory());
      setStats(getGameStats());
    }
  }, [isOpen]);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear your game history?')) {
      clearGameHistory();
      setHistory([]);
      setStats({ totalGames: 0, asHost: 0, asPlayer: 0, recentRoles: [] });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-700/50 text-cyan-300 rounded-xl border border-cyan-500/20 transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm">History</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Game History</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-cyan-400/60 hover:text-cyan-200 hover:bg-cyan-500/10 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400">{stats.totalGames}</div>
                  <div className="text-sm text-slate-400 mt-1">Total Games</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400">{stats.asHost}</div>
                  <div className="text-sm text-slate-400 mt-1">As Host</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400">{stats.asPlayer}</div>
                  <div className="text-sm text-slate-400 mt-1">As Player</div>
                </div>
              </div>

              {/* History List */}
              <div className="space-y-3">
                {history.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>No games played yet</p>
                  </div>
                ) : (
                  history.map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-slate-800/40 border border-cyan-500/10 rounded-2xl p-4 hover:border-cyan-500/20 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{entry.isHost ? '👑' : '🎮'}</span>
                          <div>
                            <div className="font-mono text-cyan-400 font-bold">{entry.code}</div>
                            <div className="text-xs text-slate-500">{new Date(entry.date).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-400">{entry.playerCount} players</div>
                          {entry.role && <div className="text-sm text-cyan-300 mt-1">{entry.role}</div>}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Actions */}
              {history.length > 0 && (
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleClear}
                    className="flex-1 luxury-button-secondary text-red-400 hover:text-red-300"
                  >
                    Clear History
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
