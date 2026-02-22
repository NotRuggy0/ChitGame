'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface JoinGameProps {
  onJoinGame: (code: string, displayName: string) => void;
  onBack: () => void;
}

export default function JoinGame({ onJoinGame, onBack }: JoinGameProps) {
  const [code, setCode] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleJoin = () => {
    if (code.trim() && displayName.trim()) {
      onJoinGame(code.trim().toUpperCase(), displayName.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md px-4"
    >
      <div className="luxury-card space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl -z-0" />
        <div className="relative z-10">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Join Game</h2>
          <p className="text-slate-300">Enter your details to join</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">
              Game Code
            </label>
            <input
              type="text"
              placeholder="ABC123"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="luxury-input uppercase tracking-widest text-center text-2xl font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">
              Display Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={20}
              className="luxury-input"
            />
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
            onClick={handleJoin}
            disabled={!code.trim() || !displayName.trim()}
            className="luxury-button-primary flex-1"
          >
            Join Session
          </button>
        </div>
        </div>
      </div>
    </motion.div>
  );
}
