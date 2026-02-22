'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CreateGameProps {
  onCreateGame: (maxPlayers: number, hostName: string) => void;
  onBack: () => void;
}

export default function CreateGame({ onCreateGame, onBack }: CreateGameProps) {
  const [maxPlayers, setMaxPlayers] = useState('4');
  const [hostName, setHostName] = useState('');

  const playerCount = parseInt(maxPlayers) || 0;
  const isValidPlayerCount = playerCount >= 2 && playerCount <= 20;
  const showError = maxPlayers !== '' && !isValidPlayerCount;

  const handleCreate = () => {
    if (isValidPlayerCount && hostName.trim()) {
      onCreateGame(playerCount, hostName.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="luxury-card space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl -z-0" />
        <div className="relative z-10">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Create Game</h2>
          <p className="text-slate-300">Set up a new session</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              maxLength={20}
              className="luxury-input"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">
              Maximum Players
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.target.value)}
              className={`luxury-input ${showError ? 'border-2 border-red-500 focus:ring-red-500' : ''}`}
              placeholder="2-20"
            />
            {showError && (
              <p className="text-sm text-red-400 mt-2 font-medium">
                ⚠️ Player count must be between 2 and 20
              </p>
            )}
            {!showError && (
              <p className="text-xs text-slate-400 mt-2">
                Choose between 2-20 players
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onBack}
            className="luxury-button-secondary flex-1"
          >
            Back
          </button>
          <button
            onClick={handleCreate}
            disabled={!isValidPlayerCount || !hostName.trim()}
            className="luxury-button-primary flex-1"
          >
            Create Session
          </button>
        </div>
        </div>
      </div>
    </motion.div>
  );
}
