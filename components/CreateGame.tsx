'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CreateGameProps {
  onCreateGame: (maxPlayers: number, hostName: string) => void;
  onBack: () => void;
}

export default function CreateGame({ onCreateGame, onBack }: CreateGameProps) {
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [hostName, setHostName] = useState('');

  const handleCreate = () => {
    if (hostName.trim()) {
      onCreateGame(maxPlayers, hostName.trim());
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
              Maximum Players: {maxPlayers}
            </label>
            <input
              type="range"
              min="2"
              max="20"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800/60 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>2</span>
              <span>20</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="luxury-button-secondary flex-1"
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreate}
            disabled={!hostName.trim()}
            className="luxury-button-primary flex-1"
          >
            Create Session
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
