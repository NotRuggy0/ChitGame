'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRipple } from './RippleEffect';

interface HostControlsProps {
  onKickPlayer: (playerId: string) => void;
  onRestartGame: () => void;
  players: Array<{ id: string; name: string }>;
}

export default function HostControls({ onKickPlayer, onRestartGame, players }: HostControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showKickMenu, setShowKickMenu] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const { createRipple, RippleContainer } = useRipple();

  const handleKick = (playerId: string) => {
    onKickPlayer(playerId);
    setShowKickMenu(false);
    setIsOpen(false);
  };

  const handleRestart = () => {
    onRestartGame();
    setShowRestartConfirm(false);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          createRipple(e);
          setIsOpen(!isOpen);
        }}
        className="relative overflow-hidden flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-700/50 text-cyan-300 rounded-xl border border-cyan-500/20 transition-all"
        aria-label="Host controls"
      >
        <RippleContainer />
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span className="text-sm font-medium">Host Controls</span>
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
              className="absolute top-full right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-3 shadow-[0_8px_32px_rgba(6,182,212,0.2)] z-50 min-w-[220px]"
            >
              <div className="space-y-2">
                <button
                  onClick={() => setShowKickMenu(!showKickMenu)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/50 text-slate-300 transition-all text-left"
                >
                  <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                  </svg>
                  <span className="text-sm font-medium">Kick Player</span>
                </button>

                {showKickMenu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pl-4 space-y-1 max-h-48 overflow-y-auto"
                  >
                    {players.map((player) => (
                      <button
                        key={player.id}
                        onClick={() => handleKick(player.id)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 text-sm transition-all"
                      >
                        {player.name}
                      </button>
                    ))}
                  </motion.div>
                )}

                <button
                  onClick={() => setShowRestartConfirm(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/50 text-slate-300 transition-all text-left"
                >
                  <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm font-medium">Restart Game</span>
                </button>
              </div>
            </motion.div>
          </>
        )}

        {showRestartConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowRestartConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Restart Game?</h3>
              <p className="text-slate-400 mb-6">
                This will reset all roles and return to the lobby. Players will need to ready up again.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRestartConfirm(false)}
                  className="flex-1 luxury-button-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRestart}
                  className="flex-1 luxury-button-primary"
                >
                  Restart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
