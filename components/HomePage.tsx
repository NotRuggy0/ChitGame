'use client';

import { motion } from 'framer-motion';

interface HomePageProps {
  onCreateGame: () => void;
  onJoinGame: () => void;
}

export default function HomePage({ onCreateGame, onJoinGame }: HomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md px-4"
    >
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <div className="relative w-24 h-24 mx-auto mb-8">
            {/* Outer glow ring */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-3xl blur-xl" />
            {/* Icon container */}
            <div className="relative w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            Chit
          </h1>
          <p className="text-slate-300 text-lg font-light">
            Role assignment, refined
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <button
          onClick={onCreateGame}
          className="w-full luxury-button-primary text-lg py-4"
        >
          Create New Game
        </button>

        <button
          onClick={onJoinGame}
          className="w-full luxury-button-secondary text-lg py-4"
        >
          Join Game
        </button>
      </motion.div>

    </motion.div>
  );
}
