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
      className="w-full max-w-md px-4"
    >
      <div className="luxury-card space-y-6 wave-glow">
        <div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-200 to-teal-300 bg-clip-text text-transparent">Create Game</h2>
          <p className="text-slate-400">Set up a new session</p>
        </div>

        <div className="space-y-4">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-cyan-300/80">
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
            <label className="block text-sm font-medium mb-2 text-cyan-300/80">
              Maximum Players
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.target.value)}
              className={`luxury-input ${showError ? 'border-red-400/50 focus:ring-red-400/30 focus:border-red-400/50' : ''}`}
              placeholder="2-20"
            />
            {showError && (
              <p className="text-sm text-red-400/90 mt-2 font-medium">
                ⚠️ Player count must be between 2 and 20
              </p>
            )}
            {!showError && (
              <p className="text-xs text-slate-500 mt-2">
                Choose between 2-20 players
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-8">
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
    </motion.div>
  );
}
